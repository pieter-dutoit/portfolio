import { z } from 'zod'

export const taskInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Enter a title.')
    .max(100, 'Use 100 characters or fewer.'),
  priority: z.enum(['low', 'normal', 'high'])
})

export const taskSchema = taskInputSchema.extend({ id: z.uuid() })
export const taskListSchema = z.array(taskSchema)

// Simulation controls belong to the request, never to the saved task.
export const createTaskRequestSchema = z.object({
  input: taskInputSchema,
  failNextSave: z.boolean()
})

export const defaultValues = {
  title: '',
  priority: taskInputSchema.shape.priority.enum.normal
}

export const initialTasks = taskListSchema.parse([
  {
    id: '9a3ef437-2018-4c31-8242-bf5765a2081d',
    title: 'Sketch the first idea',
    priority: 'normal'
  },
  {
    id: 'c129942f-b725-472e-a35e-a5ed2d71c8e4',
    title: 'Review the details',
    priority: 'low'
  }
])
