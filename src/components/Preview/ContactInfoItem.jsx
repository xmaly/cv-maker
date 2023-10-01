import PropTypes from "prop-types";

export default function ContactInfoItem({ value, icon }) {
  return (
    <>
      {value.length !== 0 && (
        <div className="item">
          <span className="material-symbols-outlined">{icon}</span>
          <div>{value}</div>
        </div>
      )}
    </>
  );
}

ContactInfoItem.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.string,
};
