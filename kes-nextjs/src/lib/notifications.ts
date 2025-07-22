import toast from 'react-hot-toast'
import { captureMessage } from './sentry'

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
  })
}

export const showError = (message: string, error?: Error) => {
  toast.error(message, {
    duration: 6000,
    position: 'top-right',
  })
  
  if (error) {
    captureMessage(`User error: ${message}`, 'error')
  }
}

export const showWarning = (message: string) => {
  toast(message, {
    icon: '⚠️',
    duration: 5000,
    position: 'top-right',
  })
}

export const showLoading = (message: string) => {
  return toast.loading(message, {
    position: 'top-right',
  })
}

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId)
}