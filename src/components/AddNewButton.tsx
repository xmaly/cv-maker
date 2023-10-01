import React from "react";
import "../styles/AddNewButton.css";

interface AddNewButtonProps {
  mode: string;
  addNew: () => void;
}

export default function AddNewButton({ mode, addNew }: AddNewButtonProps) {
  return (
    <button
      className={`new-${mode}`}
      onClick={() => {
        addNew();
      }}
    >
      <span className="material-symbols-outlined icon">add</span>{" "}
      <span className="label">add new</span>
    </button>
  );
}
