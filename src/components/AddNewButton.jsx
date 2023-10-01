import PropTypes from "prop-types";
import "../styles/AddNewButton.css";

export default function AddNewButton({ mode, addNew }) {
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

AddNewButton.propTypes = {
  mode: PropTypes.string,
  removeActive: PropTypes.func,
  addNew: PropTypes.func,
  setForm: PropTypes.func,
};
