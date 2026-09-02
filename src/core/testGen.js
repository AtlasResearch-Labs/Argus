/**
 * Argus Unit Test Synthesizer
 * Generates runnable, robust unit tests for new functions and endpoints in the PR
 */

import { PowerboxClient } from './powerboxClient.js';

const TEST_GEN_PROMPT = `You are Argus Test Synthesizer.
Given a newly added or modified function in a pull request, write a complete, runnable unit test file covering:
1. Normal happy path execution
2. Edge cases (null/undefined inputs, empty arrays, timeout limits)
3. Error handling paths

Format the output strictly as runnable test code with zero conversational chatter.`;

export async function synthesizeTests(file, functionSnippet, testRunner = 'jest', options = {}) {
  const client = new PowerboxClient(options);
  const prompt = `Generate comprehensive unit tests for this ${file} snippet using ${testRunner}:\n\n${functionSnippet}`;

  const response = await client.complete({
    messages: [
      { role: 'system', content: TEST_GEN_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2
  });

  return response.replace(/^```[a-z]*\n/i, '').replace(/\n```$/i, '').trim();
}
