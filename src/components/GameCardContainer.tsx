import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    // TODO: improve the scale
    <div className="rounded-box w-full overflow-hidden">
      {children}
    </div>
  );
};

export default GameCardContainer;
