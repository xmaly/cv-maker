import React from "react";
import "../../styles/Preview.css";
import ContactInfoItem from "./ContactInfoItem";
import EducationSection from "./EducationSection";
import WorkingExperienceSection from "./WorkingExperienceSection";
import {
  EducationData,
  PersonalDetailsData,
  WorkingExperienceData,
} from "../../types";

interface PreviewProps {
  personalDetails: PersonalDetailsData;
  educationsArray: EducationData[];
  workingExperiencesArray: WorkingExperienceData[];
}

export default function Preview({
  personalDetails,
  educationsArray,
  workingExperiencesArray,
}: PreviewProps) {
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
