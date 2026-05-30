export const usePartnersOpen = () => useState<boolean>('partners-open', () => false)

export function openPartners () {
  const open = usePartnersOpen()
  open.value = true
  if (import.meta.client) document.body.classList.add('is-locked')
}

export function closePartners () {
  const open = usePartnersOpen()
  open.value = false
  if (import.meta.client) document.body.classList.remove('is-locked')
}
