'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useId, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { tasksQueryOptions, useCreateTask } from './queries'
import { defaultValues, taskInputSchema } from './schemas'
import { DemoStorageError, resetTasks } from './storage'

export default function Demo() {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <TaskForm />
    </QueryClientProvider>
  )
}

function TaskForm() {
  const id = useId()
  const tasks = useQuery(tasksQueryOptions)
  const queryClient = useQueryClient()
  const save = useCreateTask()
  const [failNextSave, setFailNextSave] = useState(false)
  const [notice, setNotice] = useState('')
  const [resetError, setResetError] = useState('')
  const form = useForm({
    resolver: zodResolver(taskInputSchema),
    defaultValues
  })

  const submit = form.handleSubmit(
    async (input) => {
      form.clearErrors()
      setNotice('')
      setResetError('')
      const simulateFailure = failNextSave
      setFailNextSave(false)
      try {
        const result = await save.mutateAsync({
          input,
          failNextSave: simulateFailure
        })
        if (!result.task) {
          const titleError = result.fieldErrors?.title?.errors[0]
          const priorityError = result.fieldErrors?.priority?.errors[0]
          if (titleError)
            form.setError(
              'title',
              { message: titleError },
              { shouldFocus: true }
            )
          if (priorityError)
            form.setError(
              'priority',
              { message: priorityError },
              { shouldFocus: !titleError }
            )
          if (!titleError && !priorityError)
            form.setError('root', { message: result.message })
          return
        }
        form.reset()
        setNotice('Task saved in this browser.')
      } catch (error) {
        form.setError('root', {
          message:
            error instanceof DemoStorageError
              ? error.message
              : 'The save could not be completed. Your draft is still here. Try again.'
        })
      }
    },
    () => setNotice('')
  )

  function reset() {
    setNotice('')
    setResetError('')
    try {
      queryClient.setQueryData(tasksQueryOptions.queryKey, resetTasks())
      form.reset()
      save.reset()
      setFailNextSave(false)
      setNotice('Demo reset to its two example tasks.')
    } catch (error) {
      setResetError(
        error instanceof Error ? error.message : 'The demo could not be reset.'
      )
    }
  }

  const disabled = save.isPending || tasks.isPending || tasks.isError
  const hasErrors = Object.keys(form.formState.errors).length > 0

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid gap-4 md:grid-cols-2'>
        <form
          noValidate
          onSubmit={submit}
          aria-labelledby={`${id}-create`}
          aria-busy={save.isPending}
          className='bg-background flex min-w-0 flex-col gap-5 rounded-lg border p-4 sm:p-5'
        >
          <h3 id={`${id}-create`} className='text-base font-semibold'>
            Create a task
          </h3>
          <FieldGroup>
            <Field
              data-invalid={!!form.formState.errors.title}
              data-disabled={disabled}
            >
              <FieldLabel htmlFor={`${id}-title`}>Task title</FieldLabel>
              <Input
                id={`${id}-title`}
                placeholder='Write the first draft'
                disabled={disabled}
                aria-invalid={!!form.formState.errors.title}
                aria-describedby={
                  form.formState.errors.title ? `${id}-title-error` : undefined
                }
                {...form.register('title')}
              />
              {form.formState.errors.title && (
                <FieldError id={`${id}-title-error`}>
                  {form.formState.errors.title.message}
                </FieldError>
              )}
            </Field>
            <Controller
              control={form.control}
              name='priority'
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={disabled}
                >
                  <FieldLabel htmlFor={`${id}-priority`}>
                    Task priority
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={disabled}
                  >
                    <SelectTrigger
                      id={`${id}-priority`}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.error ? `${id}-priority-error` : undefined
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {taskInputSchema.shape.priority.options.map(
                          (priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority[0].toUpperCase() + priority.slice(1)}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError id={`${id}-priority-error`}>
                      {fieldState.error.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />
            <Field orientation='horizontal' data-disabled={disabled}>
              <Checkbox
                id={`${id}-fail`}
                checked={failNextSave}
                onCheckedChange={(checked) => setFailNextSave(checked === true)}
                disabled={disabled}
                aria-describedby={`${id}-fail-help`}
              />
              <FieldContent>
                <FieldLabel htmlFor={`${id}-fail`}>Fail next save</FieldLabel>
                <FieldDescription id={`${id}-fail-help`}>
                  Simulate an integration failure and keep your draft.
                </FieldDescription>
              </FieldContent>
            </Field>
            {form.formState.errors.root && (
              <Alert variant='destructive'>
                <AlertDescription>
                  {form.formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}
            <Button type='submit' disabled={disabled}>
              {save.isPending
                ? 'Saving…'
                : hasErrors
                  ? 'Try again'
                  : 'Save task'}
            </Button>
          </FieldGroup>
        </form>
        <section
          aria-labelledby={`${id}-saved`}
          className='bg-muted/40 flex min-w-0 flex-col gap-5 rounded-lg border p-4 sm:p-5'
        >
          <h3 id={`${id}-saved`} className='text-base font-semibold'>
            Saved tasks
          </h3>
          {tasks.isPending && (
            <p role='status' className='text-muted-foreground text-sm'>
              Loading saved tasks…
            </p>
          )}
          {tasks.isError ? (
            <Alert variant='destructive'>
              <AlertDescription>{tasks.error.message}</AlertDescription>
            </Alert>
          ) : (
            <ul
              className='max-h-80 list-disc overflow-y-auto pl-5'
              aria-label='Saved tasks'
            >
              {tasks.data?.map((task) => (
                <li key={task.id} className='pb-4 last:pb-0'>
                  <span className='block text-sm leading-relaxed break-words'>
                    {task.title}
                  </span>
                  <span className='text-muted-foreground mt-1 block text-xs leading-relaxed'>
                    Priority:{' '}
                    {task.priority[0].toUpperCase() + task.priority.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <div className='flex flex-col gap-3 border-t pt-4'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <p
            role='status'
            aria-live='polite'
            className='text-muted-foreground text-sm'
          >
            {save.isPending
              ? 'Validating on the server, then saving locally…'
              : notice}
          </p>
          <Button
            variant='outline'
            size='sm'
            onClick={reset}
            disabled={save.isPending || tasks.isPending}
          >
            Reset demo
          </Button>
        </div>
        {resetError && (
          <Alert variant='destructive'>
            <AlertDescription>{resetError}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
