import React from "react";
import { WorkingExperienceData } from "../../types";

interface CreatedWorkingExperiencesProps {
  handleCreatedWorkingExperienceClicked: (
    workingExperience: WorkingExperienceData
  ) => void;
  workingExperiencesArray: WorkingExperienceData[];
  deleteWorkingExperience: (id: string) => void;
}

export default function CreatedWorkingExperiences({
  workingExperiencesArray,
  handleCreatedWorkingExperienceClicked,
  deleteWorkingExperience,
}: CreatedWorkingExperiencesProps) {
  return (
    <>
      {workingExperiencesArray.map((workingExperience) => (
        <div
          className="created-group"
          id={workingExperience.id}
          key={workingExperience.id}
        >
          <button
            className="active"
            onClick={() =>
              handleCreatedWorkingExperienceClicked(workingExperience)
            }
          >
            {workingExperience.companyName
              ? workingExperience.companyName
              : "Working experience"}
          </button>
          <span
            className={`material-symbols-outlined remove ${
              workingExperiencesArray.length < 2 ? "grey" : "red"
            }`}
            onClick={() => deleteWorkingExperience(workingExperience.id)}
          >
            cancel
          </span>
        </div>
      ))}
    </>
  );
}
