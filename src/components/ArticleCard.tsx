import { Link } from "react-router-dom";
import Image from "./common/Image";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

interface Props {
  article: {
    id: number,
    title: string,
    content: string,
    user_id: number,
    image: string,
    view: number,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
  },
  likes: number
}

const ArticleCard = ({ article, likes }: Props) => {
  return (
    <>
      <Link
        to={"/articles/" + article.id}
        className="group card w-full bg-base-300 cursor-pointer"
      >
        <figure>
          <Image
            src={article.image}
            altText={article.title}
            className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in bg-cover"
          />
        </figure>
        <div className="card-body !p-3">
          <h2 className="card-title text-base lg:text-lg">
            {article.title}
          </h2>
          <h3>
            {article.view}
            <FaEye className="w-8 h-8 text-lg" />
          </h3>
          <h3>
            {likes}
            <FaHeart className="w-8 h-8 text-lg" />
          </h3>
        </div>
      </Link>
    </>
  );
};

export default ArticleCard;
