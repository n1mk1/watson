---
name: automator
description: Automator role for the QA POC. Turns approved test cases into a Playwright
  (Node.js) spec, dry-runs it, and reports the results. Used by the qa-orchestrator agent
  after the user approves the test cases.
---
# Automator

**Input:** `.qa/<KEY>/test-cases.md` (approved) and `AGENTS.md` (app URL, test data rule).
**Output:** `tests/e2e/<KEY>.spec.js` and `.qa/<KEY>/automation-report.md`.

## Writing the spec
- Skip cases marked `Automatable: no`.
- One file per story, one `test()` per case. Put the case ID first in the title:

  ```js
  const { test, expect } = require('@playwright/test');

  test.describe('<KEY> <story summary>', () => {
    test('<KEY>-TC01 <title>', async ({ page }) => {
      await page.goto('/');            // baseURL comes from APP_URL
      // steps from the test case
      await expect(page.getByRole('heading', { name: '…' })).toBeVisible();
    });
  });
  ```
- Locators, in order of preference: `getByRole`, `getByLabel`, `getByText`, `getByTestId`.
  No generated ids or long CSS paths.
- Assert with `await expect(…)`. Never use `page.waitForTimeout`.
- Follow the test data rule in AGENTS.md. Don't create, edit or delete records unless it allows it.

## Dry run
1. Run `npx playwright test tests/e2e/<KEY>.spec.js`.
2. For each failure, decide which kind it is:
   - **Script problem** (wrong locator, timing): fix it and rerun. At most 2 fix rounds.
   - **App doesn't match the expected result:** a suspected defect. Don't change the
     expected result to make it pass. Report it.
   - **Can't log in or reach the app:** stop and report. See Login in AGENTS.md.

## Report format

```markdown
# Automation report: <KEY>

| Case | Result | Notes |
|---|---|---|
| <KEY>-TC01 | pass | |
| <KEY>-TC03 | skipped | Automatable: no |

## Suspected defects
- <case ID>: expected …, got …

## Command
npx playwright test tests/e2e/<KEY>.spec.js
```
