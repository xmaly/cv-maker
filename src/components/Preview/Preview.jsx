import "../../styles/Preview.css";
import ContactInfoItem from "./ContactInfoItem";
import EducationSection from "./EducationSection";
import WorkingExperienceSection from "./WorkingExperienceSection";
import PropTypes from "prop-types";

export default function Preview({
  personalDetails,
  educationsArray,
  workingExperiencesArray,
}) {
  return (
    <div className="preview">
      <div className="header">
        <h1 className="full-name">{personalDetails["fullName"]}</h1>
        <div className="contact-information">
          <ContactInfoItem value={personalDetails["email"]} icon="mail" />
          <ContactInfoItem
            value={personalDetails["phoneNumber"]}
            icon="phone"
          />
          <ContactInfoItem
            value={personalDetails["address"]}
            icon="location_on"
          />
        </div>
      </div>
      <div className="preview-content">
        <div className="education-section">
          <h2>Education</h2>
          <EducationSection educationsArray={educationsArray} />
        </div>
        <div className="working-experience-section">
          <h2>Working experience</h2>
          <WorkingExperienceSection
            workingExperiencesArray={workingExperiencesArray}
          />
        </div>
      </div>
    </div>
  );
}

Preview.propTypes = {
  personalDetails: PropTypes.object,
  educationsArray: PropTypes.array,
  workingExperiencesArray: PropTypes.array,
};
