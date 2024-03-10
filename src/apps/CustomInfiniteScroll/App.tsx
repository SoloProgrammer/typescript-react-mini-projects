import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

type Product = {
  id: 1;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type JsonResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

const InfiniteScrollApp = () => {
  const PRODUCTS_PER_PAGE = 20;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  let TOTAL = useRef(0);
  const url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${
    page * PRODUCTS_PER_PAGE
  }`;

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json: JsonResponse = await res.json();
      setProducts((prev) => [...prev, ...json.products]);
      TOTAL.current = json.total;
    } catch (error) {
      console.log("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [page]);

  const reachedEnd = useCallback(() => {
    return TOTAL.current > 0 && products.length >= TOTAL.current;
  }, [products.length]);

  const ScrollHandler = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } =
      containerRef.current as HTMLDivElement;

    const offset = 10;
    if (reachedEnd()) {
      containerRef?.current?.removeEventListener("scroll", ScrollHandler);
    } else if (scrollTop + clientHeight >= scrollHeight - offset && !loading) {
      setLoading(true);
      setPage((page) => page + 1);
    }
  }, [reachedEnd, products.length]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", ScrollHandler);
    }

    return (): void =>
      containerRef?.current?.removeEventListener("scroll", ScrollHandler);
  }, [products.length, containerRef.current]);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.container}>
        <h2>Infinite scroll</h2>
        {products.length > 0 && (
          <div className={styles.products}>
            {products.map((p) => (
              <div key={p.id} className={styles.product}>
                <div className={styles.image}>
                  <img src={p.thumbnail} alt={p.title} />
                </div>
                <div className={styles.desc}>
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {loading && (
          <div className={styles.loading}>
            <img
              src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"
              alt="loading.."
            />
          </div>
        )}
        {reachedEnd() && (
          <div className={styles.endText}>You reached the end</div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollApp;
