import { useState, useEffect } from 'react'

function useFetchMetar(url) {
  const [metar, setMetar] = useState([])
  const [metLoading, setMetLoading] = useState(false)
  const [metError, setMetError] = useState(null)

  let arr = []

  useEffect(() => {
    if (url) {
      setMetLoading(true)
      fetch(url)
        .then((res) => res.text())
        .then((data) => {
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(data, 'text/xml')
          const metars = xmlDoc.querySelectorAll('metarText')

          metars.forEach((metar, idx) => {
            if (idx > metars.length - 6) {
              arr.push(metar.textContent.trim())
            }
          })
          setMetar(arr)
          setMetLoading(false)
        })
    }
  }, [url])

  return { metar, metLoading, metError }
}

export default useFetchMetar
