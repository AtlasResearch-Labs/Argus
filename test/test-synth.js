import { synthesizeTests } from '../src/core/testGen.js';

const snippet = `
export function calculateDiscount(price, userRole) {
  if (price <= 0) return 0;
  if (userRole === 'VIP') return price * 0.8;
  if (userRole === 'PRO') return price * 0.9;
  return price;
}
`;

async function run() {
  const apiKey = process.env.POWERBOX_API_KEY || 'powerbox_master_sk_e430109c84d219ebf0be1eb1';

  console.log('🧪 Synthesizing automated unit tests for calculateDiscount via Powerbox...');
  const testCode = await synthesizeTests('src/math/calculator.js', snippet, 'jest', { apiKey });
  console.log('\n✅ Generated Jest Unit Test Suite:\n');
  console.log('--------------------------------------------------');
  console.log(testCode);
  console.log('--------------------------------------------------\n');
}

run().catch(console.error);

