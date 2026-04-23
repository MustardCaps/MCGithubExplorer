import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 300): T {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const delayed = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(delayed);
	}, [value, delay]);

	return debounced;
}
