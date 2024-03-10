import { ChangeEvent, useEffect, useState } from "react";

import styles from "./App.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { useAxiosFn } from "../../hooks/useAxios";

const OptimizedSearch = () => {
  const url = `https://map-places.p.rapidapi.com/queryautocomplete/json`;

  const headers = {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "map-places.p.rapidapi.com",
  };

  type ApiResponse = {
    predictions: any[];
    status: string;
  };

  const [query, setQuery] = useState("");
  const [optimizedSearchData, setOptimizedSearchData] =
    useState<ApiResponse | null>(null);
  const debouncedQuery = useDebounce<string>(query, 500).trim();

  const {
    data,
    loading,
    error,
    execute: getPlacesData,
    refetch,
    reset,
  } = useAxiosFn<ApiResponse>(
    url,
    {
      method: "GET",
      params: {
        input: debouncedQuery,
        radius: "50000",
      },
      headers,
    },
    [debouncedQuery]
  );

  useEffect(() => {
    debouncedQuery.trim() &&
      !queryExistsInData(
        debouncedQuery.trim(),
        optimizedSearchData?.predictions
      ) &&
      getPlacesData();
  }, [debouncedQuery]);

  useEffect(() => {
    setOptimizedSearchData(structuredClone(data));
  }, [data?.predictions]);

  function queryExistsInData(query: string, data: any[] = []) {
    return data.some((d) =>
      d.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (query.length && queryExistsInData(query.trim(), data?.predictions)) {
      setOptimizedSearchData((prev) => {
        if (prev && prev.predictions) {
          prev.predictions = data?.predictions.filter((d) =>
            d.description.toLowerCase().includes(query.toLowerCase())
          ) as any[];
        }
        return prev;
      });
    } else {
      query.trim().length >= 1 ? refetch() : reset();
    }
    setQuery(query);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <label htmlFor="search">Search places</label>
          <input
            autoComplete="off"
            autoCorrect="false"
            type="search"
            name="search"
            id="search"
            value={query}
            onChange={handleSearchInput}
          />
          {/* <button onClick={getPlacesData}>Search</button> */}
        </div>
        <div className={styles.searchResults}>
          {!optimizedSearchData && !loading && !error && (
            <div className={styles.center}>
              Type place name: results will be poped up here!
            </div>
          )}
          {optimizedSearchData &&
            !optimizedSearchData.predictions.length &&
            !loading && <div className={styles.center}>No results found</div>}
          {loading && <div className={styles.center}>Loading...</div>}
          {error && <div className={styles.center}>{error.message}</div>}
          {!loading &&
            optimizedSearchData?.predictions.map((p) => (
              <p key={p.place_id}>{p.description}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizedSearch;
