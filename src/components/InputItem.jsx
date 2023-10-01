import PropTypes from "prop-types";

export default function InputItem({
  id,
  type,
  label,
  name,
  callback,
  maxLength = 50,
}) {
  const handleChange = (e) => {
    callback(e.target.name, e.target.value);
  };

  return (
    <div className="input-item">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={handleChange}
        maxLength={maxLength}
      />
    </div>
  );
}

InputItem.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  callback: PropTypes.func,
  maxLength: PropTypes.number,
};
