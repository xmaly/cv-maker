import uuid from "react-uuid";

export default function EducationSection({ educationsArray }) {
  return educationsArray.map((details) => (
    <div className="education-content" key={uuid()}>
      <div>
        <div>
          {details.educationStartYear !== ""
            ? new Date(details.educationStartYear).getFullYear()
            : ""}
          {" - "}
          {details.educationEndYear !== ""
            ? new Date(details.educationEndYear).getFullYear()
            : "Present"}
        </div>
        <div>{details.location}</div>
      </div>
      <div>
        <div className="school-name strong">{details.school}</div>
        <div>
          {details.degree}
          {details.degree !== ""
            ? ` degree in ${details.fieldOfStudy}`
            : details.fieldOfStudy}
        </div>
      </div>
    </div>
  ));
}
