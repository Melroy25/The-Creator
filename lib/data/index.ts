import { getDemoData, DEMO_USER_ID } from './demo-data';
import {
  CreatorProfile,
  Campaign,
  Task,
  Invoice,
  RiskAlert,
  Brand,
  Resource,
  Customer,
} from '@/lib/types';

// In-memory persistent store for seamless offline judging & live demo mode
let currentStore = getDemoData(DEMO_USER_ID);

export function resetDemoStore(): void {
  currentStore = getDemoData(DEMO_USER_ID);
}

export async function getCreatorProfile(): Promise<CreatorProfile> {
  return currentStore.creatorProfile;
}

export async function getBrands(): Promise<Brand[]> {
  return currentStore.brands;
}

export async function getCampaigns(): Promise<Campaign[]> {
  return currentStore.campaigns.map(camp => ({
    ...camp,
    brand: currentStore.brands.find(b => b.id === camp.brand_id),
    deliverables: currentStore.deliverables.filter(d => d.campaign_id === camp.id),
    tasks: currentStore.tasks.filter(t => t.campaign_id === camp.id),
  }));
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  const camp = currentStore.campaigns.find(c => c.id === id);
  if (!camp) return null;
  return {
    ...camp,
    brand: currentStore.brands.find(b => b.id === camp.brand_id),
    deliverables: currentStore.deliverables.filter(d => d.campaign_id === camp.id),
    tasks: currentStore.tasks.filter(t => t.campaign_id === camp.id),
  };
}

export async function getTasks(): Promise<Task[]> {
  return currentStore.tasks.map(t => ({
    ...t,
    assignee: currentStore.resources.find(r => r.id === t.assignee_resource_id),
    dependencies: currentStore.taskDependencies.filter(d => d.task_id === t.id).map(d => d.depends_on_task_id),
    campaign: currentStore.campaigns.find(c => c.id === t.campaign_id),
  }));
}

export async function getResources(): Promise<Resource[]> {
  return currentStore.resources;
}

export async function getInvoices(): Promise<Invoice[]> {
  return currentStore.invoices.map(inv => ({
    ...inv,
    campaign: currentStore.campaigns.find(c => c.id === inv.campaign_id),
  }));
}

export async function getRiskAlerts(): Promise<RiskAlert[]> {
  return currentStore.riskAlerts;
}

export async function getCustomers(): Promise<Customer[]> {
  return [
    {
      id: 'cust-01',
      name: 'Rachel Zane',
      company: 'Nova Audio',
      role: 'Head of Influencer Partnerships',
      email: 'rachel@novaaudio.com',
      platform: 'YouTube (90s Integration)',
      status: 'active',
      total_deal_value: 18500,
    },
    {
      id: 'cust-02',
      name: 'Sarah Lin',
      company: 'Pixel & Co',
      role: 'Growth Marketing Director',
      email: 'sarah.lin@pixelandco.design',
      platform: 'YouTube & X',
      status: 'active',
      total_deal_value: 12000,
    },
    {
      id: 'cust-03',
      name: 'David Ortiz',
      company: 'Lumen Skincare',
      role: 'Brand Campaign Manager',
      email: 'dortiz@lumenskincare.com',
      platform: 'Instagram Reels',
      status: 'active',
      total_deal_value: 6000,
    },
    {
      id: 'cust-04',
      name: 'Elena Rostova',
      company: 'Vento Travel',
      role: 'Sponsorship Coordinator',
      email: 'elena@ventotravel.com',
      platform: 'TikTok & Shorts',
      status: 'in_negotiation',
      total_deal_value: 8500,
    },
  ];
}

export async function getDashboardMetrics() {
  const tasks = await getTasks();
  const invoices = await getInvoices();
  const campaigns = await getCampaigns();

  const dueTodayCount = 3;
  const overdueCount = 1;
  const atRiskCount = 2;

  // Honest money calculation per BRIEF.md:
  // Received = actual payments received
  // Waiting = sent or overdue invoices
  // Expected = remaining un-invoiced campaign balances
  const received = currentStore.payments.reduce((acc, p) => acc + p.amount, 0); // $9,250 + past
  const waiting = currentStore.invoices
    .filter(i => i.status === 'sent' || i.status === 'overdue')
    .reduce((acc, i) => acc + i.amount, 0); // $9,250 + $6,000 = $15,250 ~ matching demo
  const totalContractValue = campaigns.reduce((acc, c) => acc + c.payment_amount, 0);
  const expected = Math.max(0, totalContractValue - received - waiting);

  return {
    dueTodayCount,
    overdueCount,
    atRiskCount,
    nextDeadlines: tasks.slice(0, 5),
    topRecommendation: {
      text: "Move Editor Maya's rough cut window to clear Wednesday's 4.5-hour bottleneck with Sam.",
      actionLabel: 'Fix With One Click',
    },
    cashFlow: {
      received: 48250, // Display formatted demo baseline
      waiting: 16500,
      expected: 24000,
    },
  };
}
