# AUTOMATION

## Purpose

This document defines the permanent operating rules for autonomous development in the CalCome repository.

These rules always take priority over implementation details.

The automation exists to turn TASK_QUEUE tasks into independent Draft Pull Requests and accumulate those Draft Pull Requests without merging them. A user or a separate review task validates the accumulated Draft Pull Requests later.

Feature automation must never merge a Pull Request.

---

# Core Principles

1. Never commit directly to main.

2. Never merge a Pull Request automatically.

3. Complete exactly one task per scheduled execution.

4. Create at most one feature branch and one Draft Pull Request per scheduled execution.

5. TASK_QUEUE.md is a static ordered backlog, not the sole source of runtime task state.

6. Calculate effective task status from TASK_QUEUE.md, GitHub Pull Requests, and recoverable task branches.

7. An unmerged Draft Pull Request for an earlier task must not block the next effectively OPEN task.

8. Never create duplicate branches or duplicate Pull Requests for the same task.

---

# Scheduled Execution Startup

Every scheduled execution starts in this order:

1. Check for recoverable incomplete work from a previous failed execution.
2. Fetch the latest origin references.
3. Use the latest origin/main as the baseline.
4. Read AUTOMATION.md from origin/main.
5. Read TASK_QUEUE.md from origin/main.
6. Query GitHub for open, Draft, closed, and merged Pull Requests.
7. Inspect local and remote task branches.
8. Match TASK_QUEUE task IDs to existing Pull Requests and branches.
9. Calculate the effective status of every task.
10. Resume the earliest recoverable IN_PROGRESS task, or select the first effectively OPEN task when no recoverable work exists.

Do not select work from AUTOMATION.md or TASK_QUEUE.md changes that exist only in an unmerged feature branch.

If there is no recoverable IN_PROGRESS task and no effectively OPEN task, reply exactly:

NO OPEN TASKS

---

# Task ID Matching

Each TASK_QUEUE entry has a stable task ID such as P-001.

A Pull Request matches a task when the exact task ID appears in its title or body as a standalone identifier.

A branch matches a task when its name includes the task ID or when its known task slug clearly identifies that queue entry.

Every autonomous feature Pull Request must include the exact task ID in both its title and body.

Recommended title format:

feat(P-002): add weekly holiday pay calculator

---

# Effective Status Calculation

Never select a task using only the Status written in TASK_QUEUE.md.

Calculate effective status in this priority order:

## DONE

A task is effectively DONE when:

- a Pull Request whose title or body contains the task ID has been merged, or
- TASK_QUEUE.md declares the task DONE.

## IN_REVIEW

A task is effectively IN_REVIEW when it is not DONE and:

- an open Draft Pull Request whose title or body contains the task ID exists, or
- an open non-Draft Pull Request whose title or body contains the task ID exists, or
- TASK_QUEUE.md declares IN_REVIEW and a corresponding valid open Pull Request exists.

## IN_PROGRESS

A task is effectively IN_PROGRESS when it is neither DONE nor IN_REVIEW and:

- a recoverable local or remote task branch exists without a Pull Request, or
- TASK_QUEUE.md declares IN_PROGRESS and the corresponding task branch actually exists.

## OPEN

A task is effectively OPEN only when all of the following are true:

- no matching merged Pull Request exists
- no matching open Pull Request exists
- no recoverable matching task branch exists
- TASK_QUEUE.md declares the task OPEN

GitHub Pull Request state and actual branch state take precedence over stale Status text in TASK_QUEUE.md.

Examples:

- If TASK_QUEUE.md still says P-001 is IN_REVIEW but P-001 PR #35 is merged, P-001 is effectively DONE.
- If TASK_QUEUE.md says P-002 is OPEN but a P-002 Draft Pull Request is open, P-002 is effectively IN_REVIEW.
- In that case, P-002 is skipped and P-003 becomes the next candidate.

---

# Task Selection Algorithm

Use this deterministic algorithm:

1. Read TASK_QUEUE.md in file order.
2. Reconcile every task with merged Pull Requests, open Pull Requests, closed unmerged Pull Requests, local branches, and remote branches.
3. Calculate effective status using the defined priority.
4. If a recoverable IN_PROGRESS task exists, resume the earliest such task and do not select later work.
5. Otherwise skip every DONE task.
6. Skip every IN_REVIEW task.
7. Select the first OPEN task.
8. Stop scanning after one task is selected.
9. Implement only the selected task.

One execution may never select a second task.

---

# Accumulated Draft Pull Request Workflow

Draft Pull Requests intentionally accumulate without being merged.

Expected sequence:

- First execution: implement P-002, validate it, create a P-002 Draft Pull Request, then stop.
- Next execution: detect the open P-002 Draft Pull Request, calculate P-002 as IN_REVIEW, select P-003, create a P-003 Draft Pull Request, then stop.
- Later execution: reconcile all existing Draft and merged Pull Requests, then select only the next effectively OPEN task.

An earlier Draft Pull Request being unmerged is not a reason to block later effectively OPEN tasks.

After creating one Draft Pull Request, terminate the execution immediately. Do not begin another task.

---

# Role of TASK_QUEUE.md

TASK_QUEUE.md provides:

- task ID
- task title
- priority
- declared static Status
- queue order

TASK_QUEUE.md does not provide authoritative runtime IN_REVIEW or DONE state by itself.

Do not require each feature branch to update TASK_QUEUE.md after successful implementation. Multiple feature branches modifying the same queue file would create unnecessary conflicts between accumulated Draft Pull Requests.

Calculate actual IN_REVIEW and DONE state from GitHub Pull Requests on every scheduled execution.

Record task ID, implementation summary, and validation results in the Draft Pull Request title and body.

TASK_QUEUE.md modification is not a success condition for a feature task.

---

# Duplicate Prevention

Before creating a feature branch, check for:

- an open Draft Pull Request containing the task ID
- an open non-Draft Pull Request containing the task ID
- a merged Pull Request containing the task ID
- a local branch corresponding to the task ID or task slug
- a remote branch corresponding to the task ID or task slug

If a matching open Pull Request exists:

- do not create a branch
- do not create a Pull Request
- treat the task as IN_REVIEW
- continue scanning for the next effectively OPEN task

If a matching merged Pull Request exists:

- treat the task as DONE
- never implement it again

If only a recoverable branch exists and no Pull Request exists:

- do not create a duplicate branch
- inspect the existing work and previous failure
- resume that branch
- work only on that task during the execution

Closed, unmerged Pull Requests do not make a task DONE or IN_REVIEW. Inspect their branches and failure context before deciding whether the work is recoverable.

---

# Branch and Pull Request Rules

For a newly selected OPEN task:

- create a task-specific branch from the latest origin/main
- use a branch name that identifies the task ID when practical
- never commit directly to main

After successful validation:

- review the full diff
- confirm only the selected task is included
- commit the implementation
- push the feature branch to origin
- create a Draft Pull Request against main
- never create a normal Pull Request
- include the exact task ID in both the Pull Request title and body
- include an implementation summary and validation results in the body
- confirm the Pull Request is Draft
- stop the execution immediately
- never merge the Pull Request

---

# Development Scope

For feature tasks:

- follow the existing architecture
- reuse shared components whenever possible
- keep code style consistent
- prefer small focused commits
- do not introduce unnecessary dependencies
- do not perform unrelated refactoring
- implement only the selected task
- do not implement another TASK_QUEUE entry in the same execution

## Sitemap invariant

When a P task adds a public calculator route, register it through the canonical
calculator source and run the sitemap validation. Preserve the standards-compliant
XML sitemap, its `https://www.calcome.com` canonical URLs, and its `<loc>` entries;
never replace it with line-based plain-text output.

---

# Required Validation

Before validating a feature implementation, resolve and verify that `.next` is inside the repository workspace, then delete only that `.next` directory to remove stale Next.js output.

Run both commands:

npm run check

npm run build

Both commands must succeed before creating a Draft Pull Request.

After validation succeeds:

1. Review the full diff.
2. Confirm only the selected task is included.
3. Create the implementation commit.
4. Push the branch.
5. Create one Draft Pull Request.
6. Include the task ID in the title and body.
7. Record `npm run check` and `npm run build` results in the body.
8. Stop the execution.

---

# Failure and Retry Rules

If implementation or validation fails:

- stop the current execution immediately
- do not continue to another task
- report the failure clearly
- do not create a Draft Pull Request for failed work
- do not treat the failed implementation as successful
- preserve a recoverable task branch and worktree
- on the next scheduled execution, inspect that existing task branch first
- fix the previous failure before validating again
- rerun all required validation from a clean `.next` state
- never create a duplicate branch or Pull Request for the retry

A failed task cannot be skipped in favor of a later task while recoverable IN_PROGRESS work remains.

Once validation succeeds and a Draft Pull Request is created, the task becomes effectively IN_REVIEW. Later executions skip it and proceed to the next effectively OPEN task.

---

# Success Condition

One scheduled feature execution succeeds only when all of the following are true:

- exactly one effectively OPEN or recoverable IN_PROGRESS task was selected
- only that task was implemented
- npm run check passed
- npm run build passed
- the full diff was reviewed
- an implementation commit was created
- the branch was pushed
- exactly one Draft Pull Request was created
- the exact task ID appears in both the Pull Request title and body
- validation results appear in the Pull Request body
- no merge was performed
- execution stopped without selecting another task

TASK_QUEUE.md modification is not a feature-task success condition.

---

# Prohibited Actions

Never:

- commit directly to main
- merge a Pull Request automatically
- create a non-Draft Pull Request
- implement multiple tasks in one execution
- create multiple Draft Pull Requests in one execution
- create a duplicate branch for the same task
- create a duplicate Pull Request for the same task
- block later OPEN tasks merely because an earlier Draft Pull Request is unmerged
- trust unmerged TASK_QUEUE.md changes as the sole runtime state
- implement an unselected task
- perform unrelated code or documentation changes
- continue to another task after validation failure

---

# Reference Scenarios

## Scenario A

- P-001 PR #35 is merged.
- TASK_QUEUE.md may still describe P-001 as IN_REVIEW.
- P-001 effective status is DONE.
- P-001 is never implemented again.

## Scenario B

- P-002 has no matching open or merged Pull Request and no recoverable branch.
- TASK_QUEUE.md declares P-002 OPEN.
- P-002 effective status is OPEN.
- The next feature execution selects P-002.

## Scenario C

- A P-002 Draft Pull Request is open but unmerged.
- P-002 effective status is IN_REVIEW.
- No duplicate P-002 branch or Pull Request is created.
- The next feature execution selects P-003 when P-003 is effectively OPEN.

## Scenario D

- P-002 and P-003 Draft Pull Requests are both open.
- Both tasks are effectively IN_REVIEW.
- Select the next effectively OPEN task if one exists.
- Otherwise reply exactly `NO OPEN TASKS`.
