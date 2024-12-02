import React from "react";

interface AButtonProps {
  href: string;
  text: string;
  className?: string;
}

export const AButton: React.FC<AButtonProps> = (props) => {
  return (
    <a href={props.href} className={`abutton ${props.className}`}>
      {props.text}
    </a>
  );
};
