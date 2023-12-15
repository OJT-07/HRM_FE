import { FC } from "react";

interface DescriptionProps {
  desc: string;
}

const Description: FC<DescriptionProps> = ({ desc }) => (
  <p className="experience__description">{desc}</p>
);

export default Description;
