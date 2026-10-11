import { AiAssistanceDisclosure } from '@/components/posts/ai-assistance-disclosure'
import { ContentAttribution } from '@/components/content-attribution'
import type { PostFrontmatter } from '@/lib/posts'

export function PostAttribution({
  date,
  updatedAt,
  aiAssistance
}: Pick<PostFrontmatter, 'date' | 'updatedAt' | 'aiAssistance'>) {
  return (
    <ContentAttribution publishedAt={date} updatedAt={updatedAt}>
      {aiAssistance && <AiAssistanceDisclosure {...aiAssistance} />}
    </ContentAttribution>
  )
}
