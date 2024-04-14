import { ReactNode } from "react";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <div className="flex-center my-5">
      <dt className="text-lg text-gray-700">{term}: </dt>
      <dd>{children}</dd>
    </div>
  );
};

export default DefinitionItem;
