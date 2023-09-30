import React from "react";

const Cross = ({
  onClick = () => {},
  wrapperCss = "",
  className = "",
  ...props
}) => {
  return (
    <div onClick={onClick} className={`cursor-pointer ${wrapperCss}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </div>
  );
};

export default Cross;
