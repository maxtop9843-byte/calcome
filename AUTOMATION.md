# AUTOMATION

## Purpose

This document defines the permanent operating rules for autonomous development in the CalCome repository.

These rules always take priority over implementation details.

The intended outcome is a sequence of independent Draft Pull Requests that remain unmerged until a user or review agent validates them.

---

# Core Principles

1. Never commit directly to main.

2. Complete exactly one TASK_QUEUE task per scheduled execution.

3. Create a new feature branch for the first attempt at a task.

4. If the same OPEN task has an incomplete branch from a failed execution, resume that branch instead of creating a duplicate branch.

5. Always create a Draft Pull Request after successful validation.

6. Never merge automatically.

7. Never work on a task whose effective status is IN_PROGRESS, IN_REVIEW or DONE.

8. Never start the next task while the current task remains incomplete.

9. A validation failure stops only the current execution. It does not permanently abandon the task.

---

# Scheduled Execution Workflow

At the start of every scheduled execution:

1. Preserve any incomplete task branch and worktree changes.
2. Update local repository references from origin/main.
3. Read AUTOMATION.md.
4. Read TASK_QUEUE.md.
5. Reconcile TASK_QUEUE.md with existing local branches, remote branches and open Draft Pull Requests.
6. Find the first task whose effective status is OPEN.
7. Execute only that task.

If no task has an effective status of OPEN, reply exactly:

NO OPEN TASKS

---

# Effective Task Status

TASK_QUEUE.md is the primary backlog, but Draft Pull Requests may remain open without being merged into main.

Before selecting a task, determine its effective status:

- DONE: TASK_QUEUE.md says DONE or the task's Pull Request has been merged.
- IN_REVIEW: TASK_QUEUE.md says IN_REVIEW, or an open Draft Pull Request already exists for the task.
- IN_PROGRESS: TASK_QUEUE.md says IN_PROGRESS and there is an active implementation that has not failed.
- OPEN: TASK_QUEUE.md says OPEN and no open Draft Pull Request exists for the task.

Every task Pull Request title or body must include its task ID, such as P-001, so later executions can reconcile status reliably.

Never create a duplicate Pull Request for a task that already has an open Draft Pull Request.

---

# Branch Rules

For the first attempt at an OPEN task:

- create a new feature branch from the latest origin/main
- use a task-specific branch name
- record the branch in TASK_QUEUE.md

For a previously failed OPEN task:

- locate the Branch recorded in TASK_QUEUE.md
- resume the existing local or remote branch
- preserve its implementation changes
- inspect the recorded failure
- fix that failure before validating again

Do not create a second branch for the same failed task unless the recorded branch is unrecoverable and a user explicitly authorizes replacement.

---

# Development Rules

- Follow the existing architecture.
- Reuse shared components whenever possible.
- Keep code style consistent.
- Prefer small focused commits.
- Do not introduce unnecessary dependencies.
- Do not perform unrelated refactoring.
- Do not modify another task.

---

# Required Validation

Before running validation, delete the `.next` directory to remove stale Next.js generated output.

Then execute:

npm run check

npm run build

If either command fails:

- stop the current execution immediately
- do not commit the failed implementation
- do not push
- do not create a Pull Request
- keep the task Status as OPEN
- keep or record the task Branch
- record Last Result as VALIDATION_FAILED
- record a concise Failure reason
- record the Updated date
- leave all later tasks untouched

The next scheduled execution must resume this same first OPEN task, fix the recorded failure and run validation again.

---

# Successful Publication Workflow

After both required validation commands pass:

1. Review the full diff.
2. Confirm only the selected task is included.
3. Create the implementation commit.
4. Push the task branch to origin.
5. Create a Draft Pull Request against main.
6. Include the task ID in the Pull Request title or body.
7. Update the selected TASK_QUEUE.md entry:
   - Change Status to IN_REVIEW.
   - Record Branch.
   - Record the implementation Commit SHA.
   - Record the Draft PR number and URL.
   - Change Last Result to SUCCESS.
   - Clear Failure.
   - Record Updated date.
8. Commit the TASK_QUEUE.md update on the same task branch.
9. Push the queue update so the existing Draft Pull Request is updated.
10. Stop. Do not start the next task in the same execution.

Never create a normal Pull Request.

Never merge.

---

# Retry Rules

If implementation or validation fails:

- stop only the current scheduled execution
- preserve the incomplete task branch and worktree changes
- keep the current task effectively OPEN
- never continue to another task
- on the next scheduled execution, resume the same task
- fix the previous failure
- rerun all required validation from a clean `.next` state
- publish only after validation succeeds

Retries continue across scheduled executions until the task succeeds or a user explicitly cancels or changes it.

---

# Success Condition

A task is complete for automation purposes only when all of the following are true:

- implementation finished
- npm run check passed
- npm run build passed
- implementation commit created
- push completed
- Draft Pull Request created
- TASK_QUEUE.md updated to IN_REVIEW
- TASK_QUEUE.md update pushed to the same branch

Otherwise the task remains incomplete and must not allow the next task to start.
