import React from "react";

interface TrashIconProps {
  onClick?: any;
  className?: string;
}

export const TrashIcon: React.FC<TrashIconProps> = ({ onClick = null, className = "" }) => {
  return (
    <svg onClick={onClick} className={className} viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.78304 11.5803V36.923C2.78485 38.6217 4.15422 39.9981 5.84428 39.9999H24.1653C25.8554 39.9981 27.2248 38.6217 27.2266 36.923V11.5803C27.2269 11.4943 27.2425 11.4091 27.273 11.3286H2.72723C2.76528 11.4069 2.78449 11.4932 2.78304 11.5803ZM20.2877 23.1701C20.2877 22.8095 20.5787 22.5174 20.937 22.5174C21.2958 22.5174 21.5864 22.8095 21.5864 23.1701V34.5454C21.5864 34.906 21.2958 35.1981 20.937 35.1981C20.5787 35.1981 20.2877 34.906 20.2877 34.5454V23.1701ZM14.3507 23.1701C14.3507 22.8095 14.6417 22.5174 15.0001 22.5174C15.3588 22.5174 15.6494 22.8095 15.6494 23.1701V34.5454C15.6494 34.906 15.3588 35.1981 15.0001 35.1981C14.6417 35.1981 14.3507 34.906 14.3507 34.5454V23.1701ZM8.41379 23.1701C8.41379 22.8095 8.70477 22.5174 9.06314 22.5174C9.42188 22.5174 9.7125 22.8095 9.7125 23.1701V34.5454C9.7125 34.906 9.42188 35.1981 9.06314 35.1981C8.70477 35.1981 8.41379 34.906 8.41379 34.5454V23.1701Z" />
      <path d="M20.501 0.47567C20.5 0.213432 20.2887 0.00109266 20.0278 0H9.96281C9.70227 0.00109266 9.49102 0.213432 9.48993 0.47567V3.47793H20.501V0.47567Z" />
      <path d="M27.3935 4.77393H2.60684C1.16717 4.77393 0 5.94708 0 7.39412C0 8.84116 1.16717 10.0139 2.60684 10.0139H27.3935C28.8332 10.0139 30 8.84116 30 7.39412C30 5.94708 28.8332 4.77393 27.3935 4.77393Z" />
    </svg>
  );
};
