import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import useGame from "../hooks/useGame";
import LikeButton from "../components/common/LikeButton";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGame(slug!);

  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;

  if (error || !data) throw error;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="col-start">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">{data.name}</h1>
          <LikeButton id={data.id}></LikeButton>
        </div>

        <ExpandableText>{data.description}</ExpandableText>
        <GameAttributes game={data} />
      </div>
      {/* <div>
        <GameTrailer gameId={data.id} />
        <GameScreenshots gameId={data.id} />
      </div> */}
    </div>
  );
};

export default ArticleDetailPage;
