import { z } from 'zod'

import { initialTasks, taskListSchema, taskSchema } from './schemas'

export const storageKey = 'portfolio:demo:forms:v1'

export class DemoStorageError extends Error {}

export function readTasks() {
  let raw: string | null
  try {
    raw = localStorage.getItem(storageKey)
  } catch {
    throw new DemoStorageError(
      'Browser storage is unavailable. Allow site storage, then try again.'
    )
  }
  if (raw === null) return initialTasks

  try {
    const data: unknown = JSON.parse(raw)
    return taskListSchema.parse(data)
  } catch {
    throw new DemoStorageError(
      'The saved demo data is invalid. Use Reset demo to start again.'
    )
  }
}

export function saveTask(input: z.input<typeof taskSchema>) {
  const task = taskSchema.parse(input)
  const tasks = [...readTasks(), task]
  try {
    // localStorage is an editable demo substitute, not trusted application data.
    localStorage.setItem(storageKey, JSON.stringify(tasks))
  } catch {
    throw new DemoStorageError(
      'The task could not be saved in this browser. Your draft has been kept.'
    )
  }
  return task
}

export function resetTasks() {
  try {
    localStorage.removeItem(storageKey)
  } catch {
    throw new DemoStorageError(
      'The demo could not be reset. Allow site storage, then try again.'
    )
  }
  return initialTasks
}
