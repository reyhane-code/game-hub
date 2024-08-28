import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import ArticleGrid from "./ArticleGrid";

const ArticlesContainer = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get('page') || '1', 10);
    const [page, setPage] = useState<number>(initialPage);
    const { data, error, isLoading } = useArticles(page);

    useEffect(() => {
        setPage(initialPage);
    }, [initialPage]);

    return (
        <>
            {isLoading && <span>Loading...</span>}
            {error && <span>An error occurred: {error.message}</span>}
            {data ? (
                <ArticleGrid data={data} error={error} isLoading={isLoading} page={page} setPage={setPage} />
            ) : (
                <span>No items were found!</span>
            )}
        </>
    );
};

export default ArticlesContainer;
