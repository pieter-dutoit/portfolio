# Post precedent and accepted refinements

Read this for a new post or substantial editorial revision. The primary example
is `src/content/posts/forms-zod-rhf-tanstack-query.mdx`, refined with Pieter on
11 October 2026. Read its current contents rather than restoring an earlier
draft. The refinements below explain editorial decisions, not a history to
reproduce in public copy.

## Purpose, audience, and shape

The post explains a form pattern through a small working task example. Its
audience is a developer assessing how the responsibilities fit together and why
the approach is useful. Technical depth demonstrates understanding without
requiring a full application tutorial.

The final article has an explicit Introduction, four technical sections, and a
short Conclusion. Its opening names the concepts being explained. Its ending
recaps the libraries' responsibilities and practical benefits. It avoids a
promise that the reader will build an application by following instructions.

The technical progression follows schemas, form integration, server validation,
and saving with cache refresh. That order belongs to this topic. A different
post should follow its own argument or data flow rather than reuse those stages.

## What the refinements established

| Refinement | Reusable editorial decision |
| --- | --- |
| First-person explanations became second person. | Address the developer directly when useful. Keep neutral descriptions of system behaviour, rather than replacing every subject with “you”. |
| The introduction gained a heading and became a brief overview. | State the scope and expectations before the detailed example. A concise academic-style overview need not use academic jargon. |
| The conclusion gained a heading and was shortened to two sentences. | Recap the connected concepts and benefits without repeating the whole article. |
| Metaphorical headings became explicit technical headings. | Name the operation or concept readers will find in the section. |
| Subsections were added selectively, then corrected to include substantial opening topics. | Use headings to represent genuine groups. Do not leave a full example unlabelled before an isolated “1.1”. |
| Imports were added to samples. | Show where APIs and local helpers come from, even in short excerpts. |
| A type assertion was compared with Zod parsing. | Show the consequence of a distinction with concrete data when prose alone is too abstract. |
| An editor tooltip screenshot followed the resolver example. | A screenshot can demonstrate inferred types without requiring an elaborate diagram or another code listing. |
| Some explanation moved above that screenshot. | Give readers enough context to interpret evidence before presenting it. |
| Captions moved closer to media and gained explicit labels. | Make each caption visibly belong to its figure and state whether it describes a screenshot or diagram. |
| Local persistence details were reduced and the diagram changed to a production flow. | Explain the intended architecture while identifying demo substitutions accurately and briefly. |
| Repeated caching and saving explanations were trimmed. | Keep the reason for caching near its introduction and the refresh mechanics near the mutation example. |
| Demo sections gained matching headings and distinct panels. | Separate inputs and results and give both clear visual hierarchy. |
| Saved records became a bullet list. | Make a simple list look like a list, not a set of editable inputs. |

## Useful wording contrasts

- Prefer “This article explains how…” to “You will build…” for an explanatory
  article. The wording is an example, not a mandatory opening phrase.
- Prefer “Validate requests on the server” to “Check the request on the server”
  when the section specifically explains validation.
- Prefer “Connect Zod to React Hook Form” to “Let the form own the draft” as a
  navigational heading. The ownership concept can remain in the explanation.
- Prefer “Create and save tasks” to “A task, from draft to saved” for the demo.
- Use “Task priority” where “Priority” alone does not establish context.
- Prefer “That gives you autocomplete…” to “That gives me autocomplete…” when
  explaining the benefit to the developer reading the post.

The goal is clear reference and practical meaning, not mechanically replacing
every phrase with these examples.

## Read the hierarchy as an argument

Section 1 groups schema composition separately from inference and validation.
Section 2 groups resolver configuration separately from submission and feedback.
Both have meaningful opening topics, so each starts with its own “1.1” or “2.1”.
Section 3 is compact and remains undivided. Section 4 has a short introduction
about cache reuse before its two subsections, which is appropriate because that
paragraph frames both mutation and refresh behaviour.

This distinguishes a brief section introduction from an unlabelled substantive
subsection. It does not establish a rule that every H2 must have two H3 headings.

## Technical and evidence boundaries

The live demo calls a real Server Action but simulates the integration and stores
fictional records in the browser. The final flow diagram explicitly represents
production database persistence on the server. Future work must preserve that
distinction rather than copying the diagram as proof of the live demo's storage.

Likewise, cache invalidation describes how fresh records reach the interface.
It does not prove a speed increase, and a database remains authoritative rather
than literally constant. Explain results at the level the evidence supports.
Form draft preservation and reset belong to application submission handling,
not an automatic guarantee supplied by a query library.

The public article is independent of the private work that informed the pattern.
No private project identity or implementation needs to be reproduced to explain
it. This separation also applies to screenshots, comments, and diagram sources.

## General defaults versus example-specific decisions

Carry forward the explanatory voice, pragmatic hierarchy, restrained examples,
clear evidence, and respect for narrow edits. Do not generalise the following
into requirements for every post:

- Zod, React Hook Form, TanStack Query, Next.js, or a task domain.
- The original target word count, number of code samples, or section count.
- An interactive app, database substitute, failure switch, or reset control.
- Exactly two fields, two panels, a particular breakpoint, or a specific delay.
- A screenshot of inferred types or a flow diagram.

Use those devices only when they serve the next topic. Preserve any narrower
scope the user chooses, including requests for chat-only recommendations.
