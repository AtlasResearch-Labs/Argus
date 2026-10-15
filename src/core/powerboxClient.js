/**
 * Argus Universal AI Inference Client
 * Connects seamlessly to Atlas Powerbox, OpenAI, Gemini, or Ollama endpoints
 */

export class PowerboxClient {
  constructor(options = {}) {
    this.apiKey = options.apiKey ||
      process.env.POWERBOX_API_KEY ||
      process.env.ATLAS_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GEMINI_API_KEY ||
      '';

    let defaultBaseURL = 'https://powerbox.atlasresearchlabs.online/v1';
    let defaultModel = 'google/gemini-2.5-flash';

    if (process.env.OLLAMA_BASE_URL) {
      defaultBaseURL = process.env.OLLAMA_BASE_URL.replace(/\/+$/, '') + '/v1';
      defaultModel = 'llama3';
    } else if (process.env.OPENAI_API_KEY && !process.env.POWERBOX_API_KEY) {
      defaultBaseURL = 'https://api.openai.com/v1';
      defaultModel = 'gpt-4o-mini';
    } else if (process.env.GEMINI_API_KEY && !process.env.POWERBOX_API_KEY) {
      defaultBaseURL = 'https://generativelanguage.googleapis.com/v1beta/openai';
      defaultModel = 'gemini-2.5-flash';
    }

    this.baseURL = options.baseURL || process.env.POWERBOX_BASE_URL || process.env.OPENAI_BASE_URL || defaultBaseURL;
    this.model = options.model || process.env.ARGUS_MODEL || defaultModel;
  }

  hasCredentials() {
    return Boolean(this.apiKey) || this.baseURL.includes('localhost') || this.baseURL.includes('127.0.0.1');
  }

  async complete({ messages, temperature = 0.2, maxTokens = 2000, jsonMode = false }) {
    if (!this.hasCredentials()) {
      throw new Error('No API key detected. Set POWERBOX_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, or run in scan-only mode.');
    }

    const url = `${this.baseURL.replace(/\/+$/, '')}/chat/completions`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Argus-Code-Guardian/1.0.0'
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const payload = {
      model: this.model,
      messages,
      temperature,
      max_tokens: maxTokens,
      ...(jsonMode ? { response_format: { type: 'json_object' } } : {})
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Inference endpoint responded with HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    } catch (err) {
      throw new Error(`Argus inference failed: ${err.message}`);
    }
  }
}
