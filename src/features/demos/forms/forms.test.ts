import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'

import { createTaskAction } from './actions'
import { initialTasks, taskInputSchema } from './schemas'
import {
  DemoStorageError,
  readTasks,
  resetTasks,
  saveTask,
  storageKey
} from './storage'

class MemoryStorage implements Storage {
  entries = new Map<string, string>()
  get length() {
    return this.entries.size
  }
  clear() {
    this.entries.clear()
  }
  getItem(key: string) {
    return this.entries.get(key) ?? null
  }
  key(index: number) {
    return [...this.entries.keys()][index] ?? null
  }
  removeItem(key: string) {
    this.entries.delete(key)
  }
  setItem(key: string, value: string) {
    this.entries.set(key, value)
  }
}

const originalStorage = Object.getOwnPropertyDescriptor(
  globalThis,
  'localStorage'
)

beforeEach(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: new MemoryStorage(),
    configurable: true
  })
})

afterEach(() => {
  if (originalStorage)
    Object.defineProperty(globalThis, 'localStorage', originalStorage)
  else Reflect.deleteProperty(globalThis, 'localStorage')
})

test('normalises accepted values and rejects invalid titles and priorities', () => {
  assert.equal(
    taskInputSchema.parse({
      title: '  Draft the example  ',
      priority: 'normal'
    }).title,
    'Draft the example'
  )
  for (const title of ['', '   ', 'x'.repeat(101)]) {
    assert.equal(
      taskInputSchema.safeParse({ title, priority: 'normal' }).success,
      false
    )
  }
  assert.equal(
    taskInputSchema.safeParse({ title: 'Valid', priority: 'urgent' }).success,
    false
  )
})

test('the Server Action independently rejects an invalid direct request', async () => {
  const result = await createTaskAction({
    input: { title: '   ', priority: 'normal' },
    failNextSave: false
  })
  assert.equal(result.task, null)
  assert.deepEqual(result.fieldErrors?.title?.errors, ['Enter a title.'])
  assert.equal((await createTaskAction(null)).task, null)
  assert.equal(
    (
      await createTaskAction({
        input: { title: 'Valid', priority: 'normal' },
        failNextSave: 'false'
      })
    ).task,
    null
  )
})

test('the action returns narrow normalised data without storing it in the browser', async () => {
  const result = await createTaskAction({
    input: { title: '  Draft  ', priority: 'high', secret: 'not returned' },
    failNextSave: false
  })
  assert.ok(result.task)
  assert.equal(result.task.title, 'Draft')
  assert.deepEqual(Object.keys(result.task).sort(), ['id', 'priority', 'title'])
  assert.equal(localStorage.getItem(storageKey), null)
})

test('a simulated server failure returns no task and changes no saved data', async () => {
  const before = readTasks()
  const result = await createTaskAction({
    input: { title: 'Keep my draft', priority: 'normal' },
    failNextSave: true
  })
  assert.equal(result.task, null)
  assert.match(result.message ?? '', /failed on purpose/)
  assert.deepEqual(readTasks(), before)
})

test('a stored task survives a new read and reset preserves unrelated keys', () => {
  localStorage.setItem('another-demo', 'keep me')
  const task = {
    id: '5ba62818-68d9-4c75-8a2c-81d29f54f736',
    title: 'Saved task',
    priority: 'high'
  }
  saveTask({ ...task, priority: taskInputSchema.shape.priority.enum.high })
  assert.deepEqual(readTasks(), [...initialTasks, task])
  assert.deepEqual(resetTasks(), initialTasks)
  assert.deepEqual(readTasks(), initialTasks)
  assert.equal(localStorage.getItem('another-demo'), 'keep me')
})

test('malformed JSON and invalid records are not silently replaced', () => {
  for (const raw of [
    '{broken',
    '{}',
    '[{"id":"bad","title":"Bad","priority":"high"}]'
  ]) {
    localStorage.setItem(storageKey, raw)
    assert.throws(readTasks, DemoStorageError)
    assert.equal(localStorage.getItem(storageKey), raw)
    assert.throws(() => saveTask(initialTasks[0]), DemoStorageError)
    assert.equal(localStorage.getItem(storageKey), raw)
  }
  resetTasks()
  assert.deepEqual(readTasks(), initialTasks)
})

test('storage write failures preserve previously saved data and report failure', () => {
  const storage = new MemoryStorage()
  storage.setItem(storageKey, JSON.stringify(initialTasks))
  storage.setItem = () => {
    throw new Error('Quota exceeded')
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true
  })
  assert.throws(() => saveTask(initialTasks[0]), /could not be saved/)
  assert.deepEqual(readTasks(), initialTasks)
})

test('blocked storage is recoverable and cannot report a successful reset', () => {
  Object.defineProperty(globalThis, 'localStorage', {
    get() {
      throw new Error('Storage blocked')
    },
    configurable: true
  })
  assert.throws(readTasks, /storage is unavailable/)
  assert.throws(resetTasks, /could not be reset/)
})
