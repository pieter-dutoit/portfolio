'use client'

import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { z } from 'zod'

import { createTaskAction } from './actions'
import { createTaskRequestSchema } from './schemas'
import { readTasks, saveTask } from './storage'

export const tasksQueryOptions = queryOptions({
  queryKey: ['demos', 'forms', 'tasks'],
  queryFn: async () => readTasks(),
  // All writes in this demo invalidate this query. Cross-tab sync is out of scope.
  staleTime: Infinity,
  retry: false
})

export function useCreateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (request: z.input<typeof createTaskRequestSchema>) => {
      const result = await createTaskAction(request)
      if (result.task) saveTask(result.task)
      return result
    },
    onSuccess: async (result) => {
      // Expected server failures also resolve, so check before refreshing.
      if (result.task) {
        await queryClient.invalidateQueries({
          queryKey: tasksQueryOptions.queryKey
        })
      }
    },
    retry: false
  })
}
