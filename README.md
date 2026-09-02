# 👁️ Argus — The All-Seeing Autonomous Code Guardian & PR Reviewer
*Part of the Atlas Labs Sovereign Software Collective*

---

## 🚀 Why Argus?

| Dimension | CodeRabbit ($15–$30/mo) | Argus (Atlas Labs) |
|---|---|---|
| **Noise & Fluff** | Verbose, repetitive essays on simple PRs. | **Zero conversational chatter.** High-density actionable signal only. |
| **Pricing** | $15–$30 per developer / month ($180–$360/yr). | **Free for Open-Source** · **₹49 / 500k Cells** (~₹0.04 per PR review). |
| **Commit Fixes** | Manual copy-pasting. | **1-Click GitHub Merge Suggestions** (` ```suggestion `). |
| **Security Scanning** | Add-on tier. | **Built-in Zero-Trust Secret & SQL Injection Sentry**. |
| **Unit Test Synthesis** | None / basic. | **Automatic runnable test generation (Jest, PyTest, Go test)**. |

---

## ⚡ 1-Minute GitHub Action Integration

Create `.github/workflows/argus.yml` in your repository:

```yaml
name: Argus PR Sentinel

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Argus Autonomous Code Reviewer
        uses: Eren-Jaeger-DEV/argus@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          POWERBOX_API_KEY: ${{ secrets.POWERBOX_API_KEY }}
```

---

## 💻 Local Terminal CLI Usage

You can also run Argus locally on your working branch before committing:

```bash
# Audit current uncommitted changes
npx @atlas-labs/argus review

# Audit diff against main branch
npx @atlas-labs/argus review main

# Fast static secret & vulnerability scan only
npx @atlas-labs/argus scan
```

---

## 📁 Repository Architecture

```
Argus/
├── action.yml              # GitHub Action manifest
├── package.json            # @atlas-labs/argus package definition
├── bin/
│   └── argus.js            # Standalone terminal CLI runner
└── src/
    ├── core/
    │   ├── parser.js       # Universal git diff & hunk line mapper
    │   ├── security.js     # Zero-latency secret & vulnerability regex sentry
    │   ├── powerboxClient.js # Low-latency Atlas Powerbox inference gateway
    │   ├── reviewer.js     # High-density AI reviewer with 1-click suggestions
    │   └── testGen.js      # Automated runnable unit test synthesizer
    └── github/
        └── action.js       # GitHub PR API reviewer & comment publisher
```

---

*Engineered with sovereignty by [Atlas Labs](https://atlasresearchlabs.online)*
