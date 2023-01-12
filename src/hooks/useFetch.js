import useAsync from './useAsync'

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'text/plain' },
}

export default function useFetch(url, options = {}, dependencies = []) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.text()
      return res.text().then((text) => Promise.reject(text))
    })
  }, dependencies)
}
