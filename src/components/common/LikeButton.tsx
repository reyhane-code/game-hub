import React, { useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { HttpRequest } from "../../helpers/http-request-class.helper";

interface Props {
  id: number;
}

const LikeButton: React.FC<Props> = ({ id }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const handleLikeClick = async (id: number) => {
    const tokens = HttpRequest.getTokens;
    
    if (!tokens) {
      setModal(true);
      return;
    }

    setLiked(!liked);

    try {
      if (!liked) {
        await HttpRequest.post(`/likes/${id}`, {
          headers: {
            Authorization: tokens.accessToken,
          },
        });
      } else {
        await HttpRequest.delete(`/likes/${id}`, {
          headers: {
            Authorization: tokens.accessToken,
          },
        });
      }
    } catch (error) {
      console.log("error occurred", error);
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => handleLikeClick(id)}>
        {liked ? <HiHeart className="text-3xl" /> : <HiOutlineHeart className="text-3xl" />}
      </button>

      {modal && (
        <div>
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Please login first to like the game!</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={() => setModal(false)}>OK</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
