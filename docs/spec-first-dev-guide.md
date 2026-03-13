# Spec-First Development Guidelines for AI-Accelerated Teams

## Overview

This document establishes our team's approach to spec-first development when using AI coding assistants. Our goal is to maintain code quality, ensure team alignment, and enable effective review processes at scale.

**Core Principle:** The specification IS the source code. The implementation is a compiled artifact.

---

## Three-Phase Development Process

### Phase 1: Research (Understanding the System)

**Purpose:** Document how the existing system works and identify all relevant components.

**Deliverable:** `research.md` file in the feature branch

**Template:**

```markdown
# Research: [Feature Name]

## Objective

[What are we trying to understand/accomplish?]

## System Analysis

### Relevant Components

- **File:** `path/to/file.ts` (lines 45-89)
  - Purpose: [What this component does]
  - Key functions: [List main functions/classes]
  - Dependencies: [What it depends on]

### Data Flow

1. [Step-by-step how data moves through the system]
2. [Include specific file references and line numbers]

### Current Limitations

- [What doesn't work or needs improvement]
- [Technical debt or constraints to consider]

### External Dependencies

- APIs: [List any external services]
- Libraries: [Key dependencies and versions]
- Database: [Relevant schemas/collections]

## Key Findings

- [Important discoveries that will impact implementation]
- [Potential gotchas or edge cases]
```

### Phase 2: Planning (Defining the Changes)

**Purpose:** Explicitly define every change before implementation.

**Deliverable:** `plan.md` file in the feature branch

**Template:**

````markdown
# Implementation Plan: [Feature Name]

## Summary

[2-3 sentence overview of what we're building]

## Success Criteria

- [ ] [Specific, measurable outcome 1]
- [ ] [Specific, measurable outcome 2]
- [ ] [Performance requirements]

## Detailed Changes

### Component: [Component Name]

**File:** `path/to/file.ts`
**Change Type:** [New | Modify | Delete]

**What changes:**

```typescript
// Pseudocode or actual code snippet showing the change
// Be specific about interfaces, types, and data structures
```
````

**Why:** [Business/technical justification]

### API Changes

**Endpoint:** [If applicable]
**Request/Response Changes:** [Document any contract changes]

### Database Changes

**Collection/Table:** [If applicable]
**Schema Changes:** [Document structure changes]

## Testing Strategy

### Unit Tests

- [ ] [Specific test case 1]
- [ ] [Specific test case 2]

### Integration Tests

- [ ] [End-to-end scenario 1]
- [ ] [End-to-end scenario 2]

### Manual Verification

- [ ] [Steps to manually verify the feature works]

## Rollback Plan

[How do we revert if something goes wrong?]

## Dependencies & Risks

- **Blocked by:** [Any dependencies]
- **Risks:** [What could go wrong?]
- **Mitigations:** [How we'll handle risks]

````

### Phase 3: Implementation (Executing the Plan)
**Purpose:** Generate code according to the plan, updating as needed.

**Deliverable:** `implementation-log.md` tracking progress and deviations

**Template:**
```markdown
# Implementation Log: [Feature Name]

## Status: [In Progress | Complete | Blocked]

## Progress Tracking
- [x] Component A implemented per plan
- [x] Component B implemented with modification (see deviation 1)
- [ ] Integration tests pending

## Deviations from Plan
### Deviation 1: [Title]
**Original Plan:** [What we planned]
**Actual Implementation:** [What we did instead]
**Reason:** [Why the change was necessary]
**Impact:** [How this affects other components]

## AI Assistant Context
**Model Used:** [e.g., Claude 3.5, GPT-4]
**Token Usage:** [Approximate if tracked]
**Sessions Required:** [Number of context resets]

## Verification Results
- [ ] All unit tests passing
- [ ] Integration tests complete
- [ ] Manual testing complete
- [ ] Performance benchmarks met

## Notes for Reviewers
[Any specific areas that need careful review]
[Known limitations or future improvements]
````

---

## Repository Structure

```
/specs
  /feature-name
    research.md
    plan.md
    implementation-log.md
    /prompts (optional)
      research-prompt.md
      implementation-prompt.md
```

---

## Team Guidelines

### When to Use This Process

- **Required for:** Features > 200 lines of code
- **Required for:** Any changes to core business logic
- **Required for:** API changes or database schema changes
- **Optional for:** Bug fixes < 50 lines
- **Optional for:** Documentation updates

### Review Process

1. **Research Review:** Team lead reviews research.md before planning phase
2. **Plan Review:** Technical review of plan.md before implementation
3. **Code Review:** Focus on deviations from plan + critical business logic
4. **Retrospective:** Monthly review of process effectiveness

### Context Management Rules

- Keep AI context utilization under 40% when possible
- Start fresh context when switching between phases
- Document context resets in implementation log

### Quality Gates

- [ ] Research identifies all affected components
- [ ] Plan includes specific test cases
- [ ] Implementation log documents all deviations
- [ ] At least one human has read the plan before merge

---

## Prompt Engineering Best Practices

### Effective Research Prompts

```
Analyze the codebase to understand how [feature] currently works.
Document:
1. All files and specific line numbers involved
2. The data flow from input to output
3. External dependencies and APIs used
4. Current limitations or technical debt

Focus on [specific directory/component] and its interactions.
```

### Effective Planning Prompts

```
Based on this research [paste research.md], create a detailed implementation plan for [feature].

Include:
1. Specific changes to each file (with code snippets)
2. New files or components needed
3. Test cases that verify the feature works
4. Potential edge cases and how to handle them

Assume the reader has not seen the research document.
```

### Effective Implementation Prompts

```
Implement the following plan [paste plan.md]:
- Stay under 40% context usage
- Implement one component at a time
- Write tests alongside implementation
- Document any necessary deviations

Current context: [what's already been done]
Next step: [specific component to implement]
```

---

## Flexibility Guidelines

### Where Developers Have Autonomy

- **Prompt style:** Use what works for your preferred AI assistant
- **Granularity:** Adjust detail level based on complexity
- **Tooling:** Use any AI coding assistant (Cursor, Copilot, Claude, etc.)
- **Testing approach:** Unit-first vs integration-first is developer choice

### Non-Negotiable Standards

- Research before planning
- Planning before implementation
- Document deviations from plan
- Include test strategy in plan
- Commit specs to repository

---

## Metrics & Improvement

Track monthly:

- Average review time per PR
- Deviation rate from plans
- Rework percentage
- Team satisfaction with process

Iterate based on data, not opinions.

---

## FAQ

**Q: What if the plan needs major changes during implementation?**
A: Update the plan.md with a "Revised Plan" section and document why in implementation-log.md

**Q: How detailed should code snippets be in the plan?**
A: Detailed enough that another developer could implement it without ambiguity. Interfaces and data structures should be explicit.

**Q: Can I combine research and planning phases?**
A: For small features (<100 lines), yes. For anything larger, keep them separate for clarity.

**Q: What if AI generates bad code despite a good plan?**
A: This is why we track deviations. The plan is the contract; the code must meet it or document why it doesn't.

---

## Getting Started Checklist

- [ ] Read this entire document
- [ ] Try the process on a small feature first
- [ ] Share your specs in team chat for feedback
- [ ] Attend weekly spec review sessions
- [ ] Contribute improvements to this guide

---

_Last Updated: [Date]_
_Version: 1.0_