/**
 * Provider-Agnostic LLM Wrapper for Creator Flow
 * Supports OpenAI, Anthropic, or custom endpoint configured via environment variables.
 * Default: OpenAI gpt-4o-mini.
 * 
 * NOTE: As per Phase A specification, no model calls are executed in this phase.
 */

export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  model: string;
  apiKey?: string;
  baseUrl?: string;
}

export function getLLMConfig(): LLMConfig {
  const provider = (process.env.LLM_PROVIDER as 'openai' | 'anthropic' | 'custom') || 'openai';
  const model = process.env.LLM_MODEL || 'gpt-4o-mini';
  const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY;

  return {
    provider,
    model,
    apiKey,
    baseUrl: process.env.LLM_BASE_URL,
  };
}

export interface CompletionRequest {
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface CompletionResponse {
  content: string;
  model: string;
  provider: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Server-side completion dispatcher (Prepared for Phase E Brief Analyzer)
 */
export async function generateCompletion(request: CompletionRequest): Promise<CompletionResponse> {
  const config = getLLMConfig();

  if (!config.apiKey) {
    throw new Error('LLM API key is not configured in environment variables (LLM_API_KEY or OPENAI_API_KEY).');
  }

  // Prepared dispatcher skeleton - executed strictly in Phase E
  throw new Error('LLM calls are reserved for Phase E (Smart Brief Analyzer).');
}
