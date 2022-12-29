import { useState, useEffect } from 'react'

function useFetchJson(url) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)

	// if (!url) {
	// 	return { data, loading, error }
	// }

	useEffect(() => {
		setLoading(true)
		setData(null)
		setError(null)
		fetch(url)
			.then((res) => {
				if (!res.ok) {
					throw Error(
						'Could not fetch data from API. Returned with status ' + res.status
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
	}, [url])

	// useEffect(() => {
	// 	console.log('useEffect called')
	// 	setData('success')
	// }, [url])

	return { data, loading, error }
}

export default useFetchJson
