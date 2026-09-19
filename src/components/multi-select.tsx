import { Button } from '@/components/ui/button'
import * as React from 'react'
import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

interface MultiSelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)
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
      <PopoverAnchor asChild>
        <div className={cn('flex w-full flex-col gap-2', className)}>
          <PopoverTrigger asChild>
            <Button
              {...triggerProps}
              ref={triggerRef}
              variant='field'
              disabled={disabled}
              aria-haspopup='dialog'
              aria-expanded={isPopoverOpen}
            >
              <span>
                {selectedValues.length > 0
                  ? `${selectedValues.length} selected`
                  : placeholder}
              </span>
              <ChevronDown aria-hidden='true' />
            </Button>
          </PopoverTrigger>
          {selectedValues.length > 0 && (
            <div className='flex items-center gap-2'>
              <div className='flex min-w-0 flex-1 flex-wrap gap-2'>
                {selectedValues.map((value) => {
                  const option = options.find((item) => item.value === value)
                  if (!option) return null
                  return (
                    <Badge key={value} variant='secondary' className='gap-1'>
                      <span>{option.label}</span>
                      <Button
                        variant='ghost'
                        size='icon-sm'
                        disabled={disabled || option.disabled}
                        aria-label={`Remove ${option.label}`}
                        onClick={() => {
                          toggleOption(value)
                          triggerRef.current?.focus()
                        }}
                      >
                        <XCircle aria-hidden='true' />
                      </Button>
                    </Badge>
                  )
                })}
              </div>
              <Button
                variant='ghost'
                size='icon-sm'
                disabled={disabled}
                aria-label='Clear selected options'
                onClick={() => {
                  handleClear()
                  triggerRef.current?.focus()
                }}
              >
                <XIcon aria-hidden='true' />
              </Button>
            </div>
          )}
        </div>
      </PopoverAnchor>

      <PopoverContent
        aria-label={triggerProps['aria-label'] ?? placeholder}
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
          <CommandList
            aria-multiselectable='true'
            className='max-h-64 overflow-y-auto'
          >
            <CommandEmpty>{emptyIndicator || 'No results found.'}</CommandEmpty>
            {!hideSelectAll && !searchValue && (
              <CommandGroup>
                <CommandItem
                  key='all'
                  disabled={disabled}
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
                    aria-disabled={disabled || option.disabled}
                    className={cn(
                      'cursor-pointer',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                    disabled={disabled || option.disabled}
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
          </CommandList>
        </Command>
        <Separator />
        <div className='flex items-center justify-between gap-2 p-1'>
          {selectedValues.length > 0 && (
            <Button
              variant='ghost'
              size='sm'
              disabled={disabled}
              onClick={() => {
                handleClear()
                closeRef.current?.focus()
              }}
              className='flex-1'
            >
              Clear
            </Button>
          )}
          <Button
            variant='ghost'
            size='sm'
            ref={closeRef}
            onClick={() => handleOpenChange(false)}
            className='flex-1'
          >
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export type { MultiSelectOption, MultiSelectProps }
