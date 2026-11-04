# QA POC

- **App under test:** set the `APP_URL` environment variable before running tests.
- **Jira:** read through the Teamwork Graph CLI (`twg`). Read-only in the POC.
- **Test data rule:** the test environment uses production data. Tests only read and
  navigate. They don't create, edit or delete records.
- **Login:** SSO isn't automated in the POC. Log in once by hand and save the session:
  `npm run login -- <APP_URL>`, sign in in the browser that opens, then close it.
  Tests reuse `.auth/user.json`. Repeat when the session expires.
- **Outputs:** test cases and reviews in `.qa/<KEY>/`, Playwright specs in `tests/e2e/`.
