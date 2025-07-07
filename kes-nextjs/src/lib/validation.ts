import { z } from 'zod'

// Content validation schemas
export const contentItemSchema = z.object({
  section: z.string()
    .min(1, 'Section is required')
    .max(50, 'Section must be less than 50 characters')
    .regex(/^[a-zA-Z_]+$/, 'Section must contain only letters and underscores'),
  text: z.string()
    .min(1, 'Content is required')
    .max(5000, 'Content must be less than 5000 characters'),
})

export const insightSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number()
    .int('Display order must be a whole number')
    .min(0, 'Display order must be positive'),
  is_active: z.boolean(),
})

export const fileUploadSchema = z.object({
  name: z.string().min(1, 'Filename is required'),
  size: z.number()
    .max(10 * 1024 * 1024, 'File must be smaller than 10MB'),
  type: z.string().refine(
    (type) => [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif'
    ].includes(type),
    'Invalid file type'
  )
})

// Sanitization functions
export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/\.+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .substring(0, 100)
}

export const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
}

// Validation helper functions
export const validateAndSanitizeContent = (data: unknown) => {
  const parsed = contentItemSchema.parse(data)
  return {
    ...parsed,
    text: sanitizeText(parsed.text)
  }
}

export const validateAndSanitizeInsight = (data: unknown) => {
  const parsed = insightSchema.parse(data)
  return {
    ...parsed,
    title: sanitizeText(parsed.title),
    description: sanitizeText(parsed.description)
  }
}

export const validateFile = async (file: File): Promise<string | null> => {
  try {
    // Basic validation
    fileUploadSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type
    })

    // Advanced file type detection
    const { fileTypeFromBuffer } = await import('file-type')
    const buffer = await file.arrayBuffer()
    const detectedType = await fileTypeFromBuffer(buffer)

    // Verify the actual file type matches the claimed type
    if (detectedType && !file.type.includes(detectedType.mime)) {
      return 'File type mismatch detected'
    }

    return null // No errors
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message
    }
    return 'File validation failed'
  }
}