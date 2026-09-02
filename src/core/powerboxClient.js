/**
 * Argus Powerbox Inference Client
 * Connects directly to Atlas Powerbox high-throughput gateway
 */

export class PowerboxClient {
  constructor(options = {}) {
    this.baseURL = options.baseURL || process.env.POWERBOX_BASE_URL || 'https://powerbox.atlasresearchlabs.online/v1';
    this.apiKey = options.apiKey || process.env.POWERBOX_API_KEY || process.env.ATLAS_API_KEY || '';
    this.model = options.model || process.env.ARGUS_MODEL || 'google/gemini-2.5-flash';
  }

  async complete({ messages, temperature = 0.2, maxTokens = 2000, jsonMode = false }) {
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
        throw new Error(`Powerbox Gateway responded with HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    } catch (err) {
      throw new Error(`Argus Powerbox inference failed: ${err.message}`);
    }
  }
}
