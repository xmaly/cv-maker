import uuid from "react-uuid";

export default function WorkingExperienceSection({ workingExperiencesArray }) {
  return workingExperiencesArray.map((details) => (
    <div className="working-experience-content" key={uuid()}>
      <div>
        <div>
          {details.workStartYear !== ""
            ? new Date(details.workStartYear).getFullYear()
            : ""}
          {" - "}
          {details.workEndYear !== ""
            ? new Date(details.workEndYear).getFullYear()
            : "Present"}
        </div>
        <div>{details.location}</div>
      </div>
      <div>
        <div className="company-name strong">{details.companyName}</div>
        <div>{details.positionTitle}</div>
        <div className="description">{details.description}</div>
      </div>
    </div>
  ));
}
