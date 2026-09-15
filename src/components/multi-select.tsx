import * as React from 'react'
import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'

interface MultiSelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: MultiSelectOption[]
  onValueChange: (value: string[]) => void
  defaultValue?: string[]
  placeholder?: string
  searchable?: boolean
  emptyIndicator?: React.ReactNode
  hideSelectAll?: boolean
  className?: string
  disabled?: boolean
}

const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((val, index) => val === sortedB[index])
}

export function MultiSelect({
  options,
  onValueChange,
  defaultValue = [],
  placeholder = 'Select options',
  searchable = true,
  emptyIndicator,
  hideSelectAll = false,
  className,
  disabled = false,
  ...triggerProps
}: MultiSelectProps) {
  const {
    onClick: onTriggerClick,
    onKeyDown: onTriggerKeyDown,
    ...restTriggerProps
  } = triggerProps
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  const prevDefaultValueRef = React.useRef<string[]>(defaultValue)

  React.useEffect(() => {
    if (!arraysEqual(prevDefaultValueRef.current, defaultValue)) {
      setSelectedValues(defaultValue)
      prevDefaultValueRef.current = [...defaultValue]
    }
  }, [defaultValue])

  const handleOpenChange = (open: boolean) => {
    setIsPopoverOpen(open)
    if (!open) {
      setSearchValue('')
    }
  }

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchValue) return options
    const needle = searchValue.toLowerCase()
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(needle) ||
        option.value.toLowerCase().includes(needle)
    )
  }, [options, searchValue, searchable])

  const toggleOption = (optionValue: string) => {
    if (disabled) return
    const option = options.find((item) => item.value === optionValue)
    if (option?.disabled) return

    const nextValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((value) => value !== optionValue)
      : [...selectedValues, optionValue]

    setSelectedValues(nextValues)
    onValueChange(nextValues)
  }

  const handleClear = () => {
    if (disabled) return
    setSelectedValues([])
    onValueChange([])
  }

  const toggleAll = () => {
    if (disabled) return
    const selectableOptions = options.filter((option) => !option.disabled)
    if (selectedValues.length === selectableOptions.length) {
      handleClear()
      return
    }

    const allValues = selectableOptions.map((option) => option.value)
    setSelectedValues(allValues)
    onValueChange(allValues)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          {...restTriggerProps}
          role='button'
          tabIndex={disabled ? -1 : 0}
          aria-haspopup='listbox'
          aria-expanded={isPopoverOpen}
          aria-disabled={disabled}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault()
              event.stopPropagation()
              return
            }
            onTriggerClick?.(event)
            if (event.defaultPrevented) return
          }}
          onKeyDown={(event) => {
            onTriggerKeyDown?.(event)
            if (event.defaultPrevented) return
            if (disabled) return
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleOpenChange(!isPopoverOpen)
            }
          }}
          className={cn(
            'bg-card hover:bg-card/80 flex min-h-11 w-full items-center justify-between rounded-md border px-3',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
        >
          {selectedValues.length > 0 ? (
            <div className='flex w-full items-center gap-3'>
              <div className='flex min-w-0 flex-1 items-center gap-2 overflow-x-auto whitespace-nowrap'>
                {selectedValues.map((value) => {
                  const option = options.find((item) => item.value === value)
                  if (!option) return null
                  return (
                    <Badge
                      key={value}
                      className='flex items-center gap-2 px-1.5 whitespace-nowrap'
                    >
                      <span className='text-xs'>{option.label}</span>
                      <button
                        type='button'
                        aria-label={`Remove ${option.label}`}
                        className='text-muted-foreground hover:text-foreground inline-flex size-4 items-center justify-center'
                        onClick={(event) => {
                          event.stopPropagation()
                          if (disabled) return
                          toggleOption(value)
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.stopPropagation()
                          }
                        }}
                      >
                        <XCircle className='size-4' />
                      </button>
                    </Badge>
                  )
                })}
              </div>
              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  aria-label='Clear selected options'
                  className='text-muted-foreground hover:text-foreground inline-flex h-8 w-8 items-center justify-center'
                  onClick={(event) => {
                    event.stopPropagation()
                    if (disabled) return
                    handleClear()
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.stopPropagation()
                    }
                  }}
                >
                  <XIcon className='h-4 w-4' />
                </button>
                <Separator orientation='vertical' className='h-6' />
                <ChevronDown className='text-muted-foreground h-4 w-4' />
              </div>
            </div>
          ) : (
            <div className='flex w-full items-center justify-between gap-2'>
              <span className='text-muted-foreground text-sm'>
                {placeholder}
              </span>
              <ChevronDown className='text-muted-foreground h-4 w-4' />
            </div>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        role='listbox'
        aria-multiselectable='true'
        className='w-[320px] p-0'
        align='start'
      >
        <Command>
          {searchable && (
            <CommandInput
              placeholder='Search options...'
              value={searchValue}
              onValueChange={setSearchValue}
              aria-label='Search options'
            />
          )}
          <CommandList className='max-h-64 overflow-y-auto'>
            <CommandEmpty>{emptyIndicator || 'No results found.'}</CommandEmpty>
            {!hideSelectAll && !searchValue && (
              <CommandGroup>
                <CommandItem
                  key='all'
                  onSelect={toggleAll}
                  role='option'
                  aria-selected={
                    selectedValues.length ===
                    options.filter((option) => !option.disabled).length
                  }
                  className='cursor-pointer'
                >
                  <div
                    className={cn(
                      'border-border mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                      selectedValues.length ===
                        options.filter((option) => !option.disabled).length
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                    aria-hidden='true'
                  >
                    <CheckIcon className='h-4 w-4' />
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
              </CommandGroup>
            )}

            <CommandGroup>
              {filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    role='option'
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    className={cn(
                      'cursor-pointer',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                    disabled={option.disabled}
                  >
                    <div
                      className={cn(
                        'border-border mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                      aria-hidden='true'
                    >
                      <CheckIcon className='h-4 w-4' />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className='flex items-center justify-between'>
                {selectedValues.length > 0 && (
                  <CommandItem
                    onSelect={handleClear}
                    className='flex-1 cursor-pointer justify-center'
                  >
                    Clear
                  </CommandItem>
                )}
                <CommandItem
                  onSelect={() => handleOpenChange(false)}
                  className='flex-1 cursor-pointer justify-center'
                >
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export type { MultiSelectOption, MultiSelectProps }
