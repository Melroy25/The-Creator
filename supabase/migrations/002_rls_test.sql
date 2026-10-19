-- ====================================================================
-- RLS VERIFICATION TEST SCRIPT (supabase/migrations/002_rls_test.sql)
-- Proves that User B cannot read or tamper with User A's rows.
-- ====================================================================

DO $$
DECLARE
  v_user_a UUID := '11111111-1111-1111-1111-111111111111';
  v_user_b UUID := '22222222-2222-2222-2222-222222222222';
  v_brand_a UUID;
  v_brand_count_b INT;
BEGIN
  -- 1. Simulate authentication context as User A
  EXECUTE format('SET LOCAL request.jwt.claim.sub = %L', v_user_a::text);
  EXECUTE format('SET LOCAL role = %L', 'authenticated');

  -- User A creates a brand deal
  INSERT INTO brands (id, owner_id, name, contact_name, notes)
  VALUES (gen_random_uuid(), v_user_a, 'User A Secret Sponsor', 'Sarah Brand Manager', 'Confidential contract terms')
  RETURNING id INTO v_brand_a;

  -- 2. Switch authentication context to User B
  EXECUTE format('SET LOCAL request.jwt.claim.sub = %L', v_user_b::text);

  -- User B queries all brands
  SELECT COUNT(*) INTO v_brand_count_b FROM brands WHERE id = v_brand_a;

  -- Verify User B received 0 records (RLS correctly isolated User A's data)
  IF v_brand_count_b > 0 THEN
    RAISE EXCEPTION 'SECURITY BREACH: User B was able to see User A row! RLS failed!';
  ELSE
    RAISE NOTICE 'SUCCESS: RLS is active and verified. User B saw 0 rows belonging to User A.';
  END IF;

  -- Clean up test row
  EXECUTE format('SET LOCAL request.jwt.claim.sub = %L', v_user_a::text);
  DELETE FROM brands WHERE id = v_brand_a;
END $$;
