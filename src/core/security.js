/**
 * Argus Security & Secret Scanner
 * Zero-latency pattern matching for credentials, dangerous calls, and vulnerabilities
 */

const SECRET_PATTERNS = [
  { name: 'AWS Access Key ID', regex: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/, severity: 'CRITICAL' },
  { name: 'AWS Secret Access Key', regex: /aws_(?:secret_access_key|secret_key)\s*[:=]\s*["']?([A-Za-z0-9\/+=]{40})["']?/i, severity: 'CRITICAL' },
  { name: 'GitHub Personal Access Token', regex: /gh[pousr]_[A-Za-z0-9_]{36,255}/, severity: 'CRITICAL' },
  { name: 'Generic API Key / Secret', regex: /(?:api_key|apikey|secret_key|private_key|auth_token)\s*[:=]\s*["']([A-Za-z0-9_\-\.]{20,})["']/i, severity: 'HIGH' },
  { name: 'Private SSH / RSA Key', regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, severity: 'CRITICAL' },
  { name: 'Hardcoded JWT Token', regex: /eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/, severity: 'HIGH' },
  { name: 'OpenAI / Gemini API Key', regex: /(?:sk-[A-Za-z0-9]{48}|AIzaSy[A-Za-z0-9_-]{33})/, severity: 'CRITICAL' }
];

const VULNERABILITY_PATTERNS = [
  { name: 'Dangerous eval() execution', regex: /\beval\s*\(/, severity: 'HIGH', advice: 'Avoid eval() as it allows arbitrary code execution. Use JSON.parse() or safe dispatchers.' },
  { name: 'Unsafe raw SQL concatenation', regex: /(?:SELECT|INSERT|UPDATE|DELETE)\s+.*?\+\s*[a-zA-Z0-9_]+/i, severity: 'HIGH', advice: 'Potential SQL Injection. Always use parameterized queries or ORM sanitizers.' },
  { name: 'Disabled TLS Certificate Verification', regex: /rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*['"]0['"]/, severity: 'HIGH', advice: 'Disabling TLS verification exposes connections to Man-in-the-Middle attacks.' }
];

export function scanDiffForSecrets(files) {
  const findings = [];

  for (const file of files) {
    for (const hunk of file.hunks) {
      let currentLine = hunk.newStart;

      for (const rawLine of hunk.lines) {
        if (rawLine.startsWith('+')) {
          const content = rawLine.slice(1);

          // Check for Secrets
          for (const pattern of SECRET_PATTERNS) {
            if (pattern.regex.test(content)) {
              findings.push({
                file: file.newPath,
                line: currentLine,
                type: 'SECRET_LEAK',
                severity: pattern.severity,
                title: `Leaked ${pattern.name}`,
                details: `Line appears to contain a hardcoded credential or secret key. Revoke immediately and move to environment variables.`
              });
            }
          }

          // Check for Code Vulnerabilities
          for (const vuln of VULNERABILITY_PATTERNS) {
            if (vuln.regex.test(content)) {
              findings.push({
                file: file.newPath,
                line: currentLine,
                type: 'VULNERABILITY',
                severity: vuln.severity,
                title: vuln.name,
                details: vuln.advice
              });
            }
          }

          currentLine++;
        } else if (rawLine.startsWith(' ')) {
          currentLine++;
        }
      }
    }
  }

  return findings;
}
