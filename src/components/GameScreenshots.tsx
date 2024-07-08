import React from "react";
import useScreenshots from "../hooks/useScreenshots";
import Image from "./common/Image";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId);

  if (isLoading) return null;

  if (error) throw error;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {data?.results.map((file) => (
        <Image key={file.id} src={file.image} />
      ))}
    </div>
  );
};

export default GameScreenshots;
