import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(url, { withCredentials: true });
                
                if (res.status !== 200) {
                    throw new Error('Failed to fetch Data');
                }

                // console.log(res.data);

                const result = res.data.data;
                setData(result);
                setError(null);
            } catch (err) {
                setError(err);
                setData(null);
            } finally {
                setLoading(false); // Change this to false
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};

export default useFetch;