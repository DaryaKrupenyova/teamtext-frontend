import React from "react";

interface LabelProps {
  text: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = (props) => {
  return <label className={`label ${props.className}`}>{props.text}</label>;
};
