export const gaEvent = (
  action, params = {}
) => {
  if (typeof window === 'undefined') return
  if (!window.gtag) return

  window.gtag('event', action, params)
}
