import { Category } from "@/types/category";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type UseFirstGetCategoryProps = {
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
};

type UseFirstGetCategoryReturn = {
  isLoading: boolean;
  error: Error | null;
};

export const useFirstGetCategory = ({
  selectCategory,
  setSelectCategory,
}: UseFirstGetCategoryProps): UseFirstGetCategoryReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5; // リトライ回数を増やす
  const RETRY_DELAY = 2000; // 遅延を2秒に延長
  const INITIAL_DELAY = 3000; // 初回の遅延を3秒に設定

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout;

    const fetchCategory = async () => {
      if (!selectCategory.id) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/category/get");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (!result.category || !result.category.length) {
            if (retryCount < MAX_RETRIES) {
              const delay = retryCount === 0 ? INITIAL_DELAY : RETRY_DELAY;
              retryTimeout = setTimeout(() => {
                if (isMounted) {
                  setRetryCount((prev) => prev + 1);
                }
              }, delay * (retryCount + 1)); // リトライごとに遅延を増加
              return;
            }
            throw new Error("No categories found");
          }

          if (isMounted) {
            setSelectCategory((prev) => ({
              ...prev,
              id: result.category[0].id,
              name: result.category[0].name || prev.name,
            }));
            setError(null);
          }
        } catch (err) {
          if (isMounted) {
            setError(
              err instanceof Error ? err : new Error("Failed to fetch category")
            );
            console.error("Error fetching category:", err);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    };

    // 初回実行を遅延
    const initialTimeout = setTimeout(fetchCategory, INITIAL_DELAY);

    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [selectCategory.id, setSelectCategory, retryCount]);

  return { isLoading, error };
};
