import { useState, useEffect } from 'react'

function useFetchJson(url) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (url) {
			setLoading(true)
			setData(null)
			setError(null)
			fetch(url)
				.then((res) => {
					if (!res.ok) {
						throw Error(
							'Could not fetch data from API. Returned with status ' +
								res.status
						)
					}
					return res.json()
				})
				.catch((err) => {
					alert(err.message)
				})
				.then((json) => {
					setData(json)
					setLoading(false)
				})
		} else setData(null)
	}, [url])

	return { data, loading, error }
}

export default useFetchJson
