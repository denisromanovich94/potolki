export const useBriefOpen = () => useState<boolean>('brief-open', () => false)

export function openBrief () {
  const open = useBriefOpen()
  open.value = true
  if (import.meta.client) document.body.classList.add('is-locked')
}

export function closeBrief () {
  const open = useBriefOpen()
  open.value = false
  if (import.meta.client) document.body.classList.remove('is-locked')
}
