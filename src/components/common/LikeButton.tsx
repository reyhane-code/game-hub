import React, { useEffect, useState } from "react";
import { HttpRequest } from "../../helpers/http-request-class.helper";
import useAuthStore from "../../auth.store";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Props {
  id: number;
  entity: string;
  likes_count: number;
}

const LikeButton: React.FC<Props> = ({ id, entity, likes_count }) => {
  const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(likes_count);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      setLoading(true);
      try {
        const response = await HttpRequest.get<boolean>(`/v1/likes/user/liked/${entity}/${id}`);
        setLiked(response.data);
      } catch (error) {
        console.error('Error fetching like status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikeStatus();
  }, [id, entity]);

  const handleLikeToggle = async () => {
    if (loading) return; // Prevent multiple clicks while loading

    setLoading(true);
    const isLiking = liked === false; // Determine if we are liking or unliking
    const url = `/v1/likes/${entity}/${id}`;
    const method = isLiking ? 'post' : 'delete';

    try {
      const res = await HttpRequest[method](url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
        // Update the liked state and likes count based on the action
        setLiked((prevLiked) => !prevLiked); // Toggle the liked state
        setLikesCount((prevCount) => (isLiking ? prevCount + 1 : prevCount - 1));
      } else {
        console.error('Unexpected response status:', res.status);
      }
    } catch (error) {
      console.error('Error liking/disliking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <button disabled>Loading...</button>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {liked ? (
        <FaHeart className="text-red-500 text-xl cursor-pointer" onClick={handleLikeToggle} />
      ) : (
        <FaRegHeart className="text-xl cursor-pointer" onClick={handleLikeToggle} />
      )}
      <span style={{ marginLeft: '8px' }}>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
