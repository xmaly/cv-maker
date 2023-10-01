import React from "react";
import { v4 as uuidv4 } from "uuid";
import { EducationData } from "../../types";

interface EducationSectionProps {
  educationsArray: EducationData[];
}

export default function EducationSection({
  educationsArray,
}: EducationSectionProps) {
  return (
    <>
      {educationsArray.map((details) => (
        <div className="education-content" key={uuidv4()}>
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
      ))}
    </>
  );
}
