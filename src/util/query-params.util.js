export const queryParams = (query) => {
  if (!query) {
    return ''
  }

  const q = query

  const qs = Object.keys(q)
    .map((key) => {
      if (q[key] || q[key] === 0 || q[key] === false) {
        return `${key}=${q[key]}`
      }
    })
    .filter((val) => val)
    .join('&')
  return qs.length > 0 ? `?${qs}` : ''
}
