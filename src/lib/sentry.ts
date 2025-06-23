import * as Sentry from "@sentry/react"

export const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    environment: import.meta.env.MODE,
    tracesSampleRate: 1.0,
    beforeSend(event) {
      // Don't send events in development
      if (import.meta.env.DEV) {
        console.log('Sentry event (dev mode):', event)
        return null
      }
      return event
    }
  })
}

export const captureError = (error: Error, context?: Record<string, unknown>) => {
  console.error('Error captured:', error, context)
  
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        const value = context[key]
        // Convert value to string for Sentry tags/context
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
        scope.setTag(key, stringValue)
      })
    }
    Sentry.captureException(error)
  })
}

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  Sentry.captureMessage(message, level)
}