import { Link } from "react-router-dom";
import Image from "./common/Image";
import Article from "../entities/Article";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <>
      <Link
        to={"/articles/" + article.id}
        className="group card w-full bg-base-300 cursor-pointer"
      >
        {/* <figure>
          <Image
            src={game.background_image}
            altText={article.title}
            className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in bg-cover"
          />
        </figure> */}
        <div className="card-body !p-3">
          <h2 className="card-title text-base lg:text-lg">
            {article.title}
            {/* <Emoji rating={game.rating_top} /> */}
          </h2>
        </div>
      </Link>
    </>
  );
};

export default ArticleCard;
