export function parseContentDate(
  value: unknown,
  field: string,
  source: string
): string {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(`${value}T00:00:00.000Z`)
    if (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    ) {
      return value
    }
  }

  throw new Error(
    `${source} requires ${field} to be a quoted YYYY-MM-DD calendar date.`
  )
}

export function parseUpdatedAt(
  value: unknown,
  publishedAt: string,
  source: string
): string | undefined {
  if (value === undefined) return undefined
  const updatedAt = parseContentDate(value, 'updatedAt', source)
  if (updatedAt < publishedAt) {
    throw new Error(`${source} updatedAt must not precede publication.`)
  }
  return updatedAt
}
