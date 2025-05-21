import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!url) return; // guard clause

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const result = await res.json();

                // ✅ DIRECTLY set data if result is an array
                //setData(result); // because the response is an array, not an object with `.data`

                setData(Array.isArray(result) ? result : result.data || []);
            } catch (err) {
                setError(err.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};

export default useFetch;
