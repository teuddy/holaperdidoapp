import React, { FC, ReactNode } from "react";

const PrimaryButton: FC<{
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | null;
}> = ({ children, onClick, type }) => {
  return type ? (
    <button
      type="submit"
      className="w-full max-w-sm p-4 bg-indigo-500/70 hover:bg-indigo-500 outline outline-0 outline-indigo-500/20 hover:outline-8 hover:text-gray-100 rounded-lg duration-200 font-bold"
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      className="w-full max-w-sm p-4 bg-indigo-500/70 hover:bg-indigo-500 outline outline-0 outline-indigo-500/20 hover:outline-8 hover:text-gray-100 rounded-lg duration-200 font-bold"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
