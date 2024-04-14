import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    // TODO: improve the scale
    <div className="rounded-box overflow-hidden w-[50%] transform hover:scale-110 transition-all duration-200 ease-in">
      {children}
    </div>
  );
};

export default GameCardContainer;
