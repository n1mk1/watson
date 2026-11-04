# Meeting notes: test automation workflow

Ref: 2235010

## Proposed workflow

| # | Step | Who | Input → Output |
|---|------|-----|----------------|
| 1 | Write test cases | Tester | User story / BRD / Confluence requirement → draft test cases |
| 2 | Review test cases | BA (with an **Agent BA Reviewer** helping) | Draft test cases → BA-approved test cases |
| 3 | Run tests manually | Tester | Approved test cases → manual results (slow, time-consuming today) |
| 4 | Automate approved test cases | Automator | Approved test cases → Playwright scripts (Node.js) |
| 5 | Dry run | Automator | One finished script → confirm it works before building more |
| 6 | Add to the batch | Automator | Working scripts → regression suite |
| 7 | Run automatically | CI/CD | Every nightly batch or every CI/CD build → automated test results |

Why the BA reviews: the BA brought the requirement, so they confirm the test cases match it.

## Environment and data

- **Login:** SSO
- **Browser:** incognito mode (clean session each run, no cached logins)
- **Data validation:** checked against data from DP
- **Data:** tests use production data

## Decisions

- Automation tool: **Playwright**, written in **Node.js (JavaScript)**
- Only BA-approved test cases get automated
- Do a dry run after the first script before scaling up
- Automated suite runs nightly and on CI/CD builds

## Open questions

1. **SSO in automation.** How will Playwright log in through SSO unattended (no MFA prompt)? Options to look into: a dedicated test user, saved auth state (`storageState`), or OAuth/JWT.
2. **Production data.** Are the tests read-only? If any test creates or edits records, running against prod data is risky. Is a sandbox with copied data an option?
3. **What is "DP"?** Confirm which system the validation data comes from.
4. **Agent BA Reviewer.** What does it check (coverage of acceptance criteria, missing edge cases, wording)? Does it run before the BA or replace part of their review?
5. **Manual vs automated.** Does every approved case get run manually first, then automated, or only the ones not yet automated?
6. **CI/CD trigger.** Which pipeline runs it, and who gets the results and failures?
7. **Where test cases live.** Confluence, Jira/Xray, a spreadsheet? The agent and the automator both need to read from it.
