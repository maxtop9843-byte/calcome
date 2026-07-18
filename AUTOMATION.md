# AUTOMATION

## Purpose

This document defines the permanent rules for autonomous development in CalCome.

The automation must turn exactly one eligible `TASK_QUEUE.md` entry into a validated Pull Request and then merge it automatically only after repository checks and the Vercel preview succeed.

No user approval is required for an eligible automation Pull Request that satisfies every rule below.

---

## Non-negotiable rules

1. Never commit directly to `main`.
2. Complete exactly one task per scheduled execution.
3. Never start a second task in the same execution.
4. Never create a duplicate task branch or Pull Request.
5. Start new work from the latest `origin/main`.
6. Preserve all unrelated behavior already present on `main`.
7. Run `npm run check`, `npm run build`, and `git diff --check`.
8. Never bypass, weaken, remove, or falsify validation.
9. Only explicitly opted-in automation Pull Requests may merge automatically.
10. A failed implementation must never be merged.

---

## Startup and stale-operation cleanup

At the start of every scheduled execution:

1. Fetch all origin references.
2. Inspect whether a rebase, merge, cherry-pick, or revert is already in progress.
3. Identify the task ID associated with any interrupted operation.
4. Verify matching Pull Requests directly through GitHub.
5. Read this file and `TASK_QUEUE.md` from the latest `origin/main`.
6. Reconcile task status with Pull Requests and local and remote task branches.

If an interrupted operation belongs to a task with a merged Pull Request:

- treat the task as `DONE`
- abort only that stale interrupted operation
- switch to `main`
- fast-forward to the latest `origin/main`
- continue task selection

If it belongs to a task with an open Pull Request:

- treat the task as `IN_REVIEW`
- abort the stale local operation unless the open Pull Request itself explicitly requires recovery
- never create a duplicate Pull Request
- continue task selection

Resume an interrupted operation only when the task has no matching merged or open Pull Request and has genuinely recoverable branch work.

Never stop merely to report that an operation or validation command is still in progress.

---

## Effective task status

Match the exact task ID, such as `P-012`, in Pull Request titles and bodies. Also inspect corresponding task branches.

Use this priority:

### DONE

A matching Pull Request is merged, or `TASK_QUEUE.md` explicitly declares the task `DONE`.

### IN_REVIEW

The task is not `DONE` and has a matching open Draft or normal Pull Request.

### IN_PROGRESS

The task is neither `DONE` nor `IN_REVIEW` and has a recoverable local or remote task branch without an open Pull Request.

### OPEN

All of the following are true:

- `TASK_QUEUE.md` declares the task `OPEN`
- no matching merged Pull Request exists
- no matching open Pull Request exists
- no recoverable task branch exists

GitHub state and actual branch state take precedence over stale queue text.

A stale branch belonging to a merged task is not recoverable `IN_PROGRESS`.

---

## Task selection

1. Reconcile tasks in `TASK_QUEUE.md` order.
2. Resume the earliest genuinely recoverable `IN_PROGRESS` task if one exists.
3. Otherwise select the first effectively `OPEN` task.
4. Stop scanning after selecting one task.
5. Implement only that task.

If no recoverable `IN_PROGRESS` task and no effectively `OPEN` task exist, reply exactly:

`NO OPEN TASKS`

---

## Branch and scope

For a new `OPEN` task:

- create one task-specific branch from the latest `origin/main`
- include the task ID in the branch name when practical
- never use another unmerged task branch as the baseline

For a recoverable `IN_PROGRESS` task:

- resume the existing branch
- do not create a replacement branch

Implementation must:

- follow the current architecture
- reuse shared components
- remain limited to the selected task
- avoid unrelated refactoring
- avoid unnecessary dependencies
- preserve all existing calculators, routes, redirects, metadata, navigation, tests, and SEO behavior

Do not modify `TASK_QUEUE.md` merely to record runtime review or completion state. GitHub Pull Requests are the authoritative runtime record.

---

## Shared-file and conflict safety

Before editing a shared file, inspect its latest `origin/main` version.

Shared files include registries, redirects, navigation, language selection, sitemap, robots, metadata, structured-data utilities, shared schemas, shared tests, configuration, and package files.

Every shared-file change must:

- preserve all unrelated current content
- be the smallest additive change required
- preserve every newer entry from `origin/main`
- add the selected task exactly once where applicable

If the task branch predates `origin/main`, rebase it.

A conflict alone is not a reason to stop. Inspect `origin/main`, the task version, the common ancestor, and related tests. Preserve all main behavior and reapply only the selected task.

Never resolve a conflict by accepting an entire stale shared-file version or by deleting newer main entries.

After rewritten history, update an existing remote task branch using `--force-with-lease` only. Never use an unconditional force push.

Stop only when the correct combined behavior remains genuinely ambiguous after inspecting the repository and tests.

---

## SEO and sitemap invariants

When adding a public calculator route:

- register it through the existing canonical calculator or route source
- preserve every existing public URL
- add the selected public route exactly once
- use only `https://www.calcome.com` as the production origin
- preserve the existing standards-compliant XML sitemap
- preserve `urlset` or `sitemapindex`, `loc` elements, and XML-compatible response behavior
- never replace the sitemap with plain text
- never add localhost, preview, duplicate, internal, private, or non-canonical URLs
- never fabricate `lastmod`, `changefreq`, or `priority`

If the task does not require shared SEO or sitemap changes, do not modify them for cleanup.

---

## Validation and recovery

Before validation:

1. Confirm the branch contains the latest `origin/main`.
2. Inspect the complete diff against `origin/main`.
3. Confirm only the selected task is included.
4. Confirm no existing entry or behavior disappeared.
5. Confirm no Git operation remains unresolved.
6. Resolve `.next` and verify it is inside the repository workspace.
7. Delete only that repository-local `.next`.

Run:

```bash
npm run check
npm run build
git diff --check
```

Run every existing relevant route, sitemap, SEO, metadata, and structured-data test when those areas change.

The first validation failure is not automatically terminal.

When validation fails:

1. Read and diagnose the exact error.
2. Fix it if it is within the selected task or necessary integration.
3. Re-run the failed validation.
4. Continue the diagnose-fix-validate cycle until validation succeeds or a genuine terminal blocker is proven.

Fix repository-formatter failures with the configured formatter. Update legitimate exact-list, count, registry, redirect, route, sitemap, and metadata expectations additively while preserving every existing expectation.

Never weaken or remove a test to obtain a passing result.

Wait for every command to reach a final exit status. Poll long-running commands at intervals no longer than 60 seconds. A running command is not a final result.

A terminal blocker exists only when safe completion is impossible because of missing permission or credentials, persistent external-service failure, materially ambiguous requirements, missing required history, unrelated required changes, or unauthorized destructive action.

---

## Pull Request and automatic merge

After all local validation succeeds:

1. Review the complete diff against the latest `origin/main`.
2. Commit the selected task.
3. Push the task branch.
4. Create exactly one non-Draft Pull Request against `main`.
5. Include the exact task ID in both title and body.
6. Add this exact standalone line to the Pull Request body:

`AUTO_MERGE: true`

7. Include implementation and shared-file summaries.
8. Include results for `npm run check`, `npm run build`, and `git diff --check`.
9. Directly verify the Pull Request, branch, base, body marker, and URL.

The repository's Auto Merge workflow is the only component authorized to merge.

It may merge only when all are true:

- base branch is `main`
- head branch belongs to this repository
- Pull Request is not Draft
- body contains the exact `AUTO_MERGE: true` marker
- GitHub Actions CI completed successfully for the exact head SHA
- Vercel reported a successful preview for the exact head SHA
- the Pull Request is mergeable
- no unresolved required review or protection blocks the merge

If checks are pending, leave the Pull Request open and let the Auto Merge workflow finish. Do not start another task during the same scheduled execution.

Never add the marker to experimental, manual-review, or unvalidated Pull Requests.

---

## Post-merge behavior

A successful automatic merge triggers:

- CI on `main`
- Vercel production deployment
- the Production Smoke workflow

The Production Smoke workflow checks the public homepage and sitemap. A production-smoke failure must be treated as a blocker before later automation continues.

The next scheduled execution must inspect the latest `main` workflow state. If the latest production smoke failed, do not select another feature task; report the failure for recovery.

---

## Success result

A scheduled feature execution succeeds when:

- exactly one eligible task was selected
- only that task was implemented
- all required local validation passed
- one commit and one task branch were pushed
- exactly one eligible non-Draft Pull Request was created
- the exact task ID and `AUTO_MERGE: true` marker were verified
- no second task was started

The scheduled execution does not need to remain active while GitHub waits for CI and Vercel. The repository workflow completes the merge asynchronously.

Final reporting must contain only verified facts and must never present a progress statement as completed work.
