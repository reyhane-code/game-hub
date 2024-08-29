import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Modal from './Modal'
import useAuthStore from '../../auth.store';
import { HttpRequest } from '../../helpers/http-request-class.helper';


interface LikeButtonProps {
  initialLikes?: number;
  entity: string;
  id: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes = 0, entity, id }) => {
  const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!accessToken) {
        setModalOpen(true); // Open the modal if not logged in
        return;
      }

      try {
        const res = await HttpRequest.get<boolean>(`/v1/likes/user/liked/${entity}/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res) {
          const data = res.data;
          setLiked(data);
          console.log('user liked', liked)
        }
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkIfLiked();
  }, [entity, id]);

  const handleLike = async () => {
    if (!accessToken) {
      setModalOpen(true);
      return;
    }

    const isLiking = !liked;
    const url = `/v1/likes/${entity}/${id}`;

    setLoading(true);

    try {
      const res =
        isLiking ? await HttpRequest.post(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
          :
          await HttpRequest.delete(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
      if (!res) {
        throw new Error('Network response was not ok');
      }

      setLikes(isLiking ? likes + 1 : likes - 1);
      setLiked(isLiking);
    } catch (error) {
      console.error('Error liking/unliking:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleLike} disabled={loading} style={{ cursor: 'pointer', padding: '10px', fontSize: '16px' }}>
        <div className='w-full felx justify-between items-center'>
          {loading ? 'Loading...' : liked ? <FaHeart color="red" /> : <FaRegHeart />} {likes}
        </div>
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title="Login Required"
        message="You must be logged in to like this item."
      />

    </div>
  );
};

export default LikeButton;
