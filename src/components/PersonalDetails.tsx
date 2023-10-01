import PropTypes from "prop-types";
import InputItem from "./InputItem";
import "../styles/PersonalDetails.css";

export default function PersonalDetails({ callback, personalDetails }) {
  const handlePersonalDetailsChange = (name, value) => {
    callback("personal-details", { ...personalDetails, [name]: value });
  };
  return (
    <div className="personal-details">
      <h1>Personal details</h1>
      <InputItem
        id="full-name"
        type="text"
        label="Full name"
        name="fullName"
        callback={handlePersonalDetailsChange}
        maxLength={30}
      />
      <InputItem
        id="email"
        type="email"
        label="E-mail"
        name="email"
        callback={handlePersonalDetailsChange}
        maxLength={40}
      />
      <InputItem
        id="phone"
        type="tel"
        label="Phone number"
        name="phoneNumber"
        callback={handlePersonalDetailsChange}
        maxLength={13}
      />
      <InputItem
        id="address"
        type="address"
        label="Address"
        name="address"
        callback={handlePersonalDetailsChange}
        maxLength={30}
      />
    </div>
  );
}

PersonalDetails.propTypes = {
  header: PropTypes.string,
  callback: PropTypes.func,
  personalDetails: PropTypes.object,
};
