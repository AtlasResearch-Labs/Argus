/**
 * Argus Main Entrypoint
 */

import { runGitHubAction } from './github/action.js';

if (process.env.GITHUB_ACTIONS === 'true') {
  runGitHubAction().catch(err => {
    console.error('❌ Argus Fatal Error:', err);
    process.exit(1);
  });
} else {
  console.log('👁️ Argus Autonomous Sentinel — Initialized.');
}
