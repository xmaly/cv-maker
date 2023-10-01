import React from "react";
import { v4 as uuidv4 } from "uuid";
import { WorkingExperienceData } from "../../types";

interface WorkingExperienceSectionProps {
  workingExperiencesArray: WorkingExperienceData[];
}

export default function WorkingExperienceSection({
  workingExperiencesArray,
}: WorkingExperienceSectionProps) {
  return (
    <>
      {workingExperiencesArray.map((details) => (
        <div className="working-experience-content" key={uuidv4()}>
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
            <div>{details.workLocation}</div>
          </div>
          <div>
            <div className="company-name strong">{details.companyName}</div>
            <div>{details.positionTitle}</div>
            <div className="description">{details.description}</div>
          </div>
        </div>
      ))}
    </>
  );
}
