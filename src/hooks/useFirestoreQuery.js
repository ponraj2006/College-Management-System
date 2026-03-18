// ── useFirestoreQuery Hook ──
// Generic hook for Firestore queries with loading/error state
import { useState, useEffect, useCallback } from "react";

export default function useFirestoreQuery(queryFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await queryFn();
            setData(result);
        } catch (err) {
            setError(err.message);
            console.error("Firestore query error:", err);
        } finally {
            setLoading(false);
        }
    }, deps);

    useEffect(() => {
        execute();
    }, [execute]);

    const refetch = () => execute();

    return { data, loading, error, refetch };
}
