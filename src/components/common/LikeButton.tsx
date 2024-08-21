import React, { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { HttpRequest } from "../../helpers/http-request-class.helper";
import useAuthStore from "../../auth.store";

interface Props {
  id: number;
}

const LikeButton: React.FC<Props> = ({ id }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);

  const toggleLike = () => {
    if (accessToken === "") {
      setModal(true);
    }
    setLiked(!liked);
  };

  const likeOrUnlike = async () => {
    console.log("in here");
    if (!accessToken) return;

    const url = `/v1/likes/${id}`;

    try {
      console.log(liked);
      const res = liked
        ? await HttpRequest.delete(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        : await HttpRequest.post(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

      console.log(res, "res");
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  // useEffect(() => {
  //   likeOrUnlike();
  // }, [liked]);

  return (
    <div>
      <button
        className="btn"
        onClick={async () => {
          toggleLike();
          await likeOrUnlike();
        }}
      >
        {liked ? (
          <HiHeart className="text-3xl" />
        ) : (
          <HiOutlineHeart className="text-3xl" />
        )}
      </button>

      {modal && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg"></h3>
            <p className="py-4">Please login first to like the game!</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setModal(false)}>
                OK
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default LikeButton;
