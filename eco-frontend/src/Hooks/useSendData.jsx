import axios from `axios`
import { useState, useEffect } from 'react'

export const useSendData = (url) => {
    const [res, setRes] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const postData = async (data) => {
        setLoading(true)
        setError(null)
        setRes(null)


        try {
            const jsonData = JSON.stringify(data)
            const res = await axios.post(url, {
                jsonData
            }, { withCredentials: true })

            if(!res.ok) throw new Error (`Error: ${res.status} ${res.msg}`)
            
            const result = await res.json()

            setRes(result)

        } catch (err) {
            setError(err)
        }finally {
            setLoading(false)
        }
    }

    return [ postData, loading, error, res]
}