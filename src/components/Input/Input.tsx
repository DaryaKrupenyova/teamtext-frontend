import React from "react";

interface InputProps {
  onChange: any;
  onBlur?: () => void | null;
  onKeyDown?: (param: any) => void | null;
  value: string;
  type: string;
  id?: string;
  name?: string;
  placeholder?: string;
  isError?: boolean;
  className?: string | "";
}

export const Input: React.FC<InputProps> = (props) => {
  const inputClassName = props.isError ? "error_input" : "input";

  return <input onChange={props.onChange} onBlur={props.onBlur} onKeyDown={props.onKeyDown} value={props.value} type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} className={`${inputClassName} ${props.className}`} />;
};
