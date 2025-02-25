import { useState, useEffect } from "react";
import axios  from "axios";

export const useFetch = (url) =>{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await axios.get(url, { withCredentials: true })
                if (!res.ok) {
                    throw new Error('Failed to fetch Data')
                }

                const result = await res.json()
                setData(result)

            } catch (err) {
                setError(err)
            } finally {
                setLoading(true)
            }
        }

        fetchData()

    }, [url])

    return {data, error, loading}
}