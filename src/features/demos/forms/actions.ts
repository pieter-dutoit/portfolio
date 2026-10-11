'use server'

import { z } from 'zod'

import { createTaskRequestSchema, taskSchema } from './schemas'

export async function createTaskAction(request: unknown) {
  // A typed caller and client validation cannot establish trust across a request.
  const parsed = createTaskRequestSchema.safeParse(request)
  if (!parsed.success) {
    return {
      task: null,
      fieldErrors: z.treeifyError(parsed.error).properties?.input?.properties,
      message: 'Check the form values and try again.'
    }
  }

  // This public demo has no protected resource or user account. A real write
  // must authenticate and authorise the caller here, then use server-only data
  // access. Never put integration credentials or privileged data in the client.
  // The fixed delay and failure switch make a simulated integration observable.
  await new Promise((resolve) => setTimeout(resolve, 600))
  if (parsed.data.failNextSave) {
    return {
      task: null,
      fieldErrors: undefined,
      message:
        'This save failed on purpose. Your draft is still here. Try again.'
    }
  }

  // We return only fictional demo fields. Production persistence belongs here
  // on the server; this example lets the browser save the result in localStorage.
  const task = taskSchema.parse({
    ...parsed.data.input,
    id: crypto.randomUUID()
  })
  return { task, fieldErrors: undefined, message: null }
}
