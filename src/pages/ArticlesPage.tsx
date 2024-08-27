import ArticleGrid from "../components/ArticleGrid";
import { useArticles } from "../hooks/useArticles";

const ArticlesPage = () => {
  const { data, error, isLoading } = useArticles()
  return (
    <>
      <ArticleGrid data={data} error={error} isLoading={isLoading} />
    </>
  );
};

export default ArticlesPage;
