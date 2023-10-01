import React from "react";
import CreatedWorkingExperiences from "./CreatedWorkingExperiences";
import InputItem from "../InputItem";
import "../../styles/WorkingExperience.css";
import "../../styles/CreatedGroup.css";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import AddNewButton from "../AddNewButton";
import { WorkingExperienceData } from "../../types";

interface WorkingExperienceProps {
  workingExperiencesArray: WorkingExperienceData[];
  removeActiveClass: (id: string) => void;
  callback: (mode: string, data: any) => void;
  initValues: () => WorkingExperienceData;
}

export default function WorkingExperience({
  workingExperiencesArray,
  removeActiveClass,
  callback,
  initValues,
}: WorkingExperienceProps) {
  const [workingExperienceWasDeleted, setWorkingExperienceWasDeleted] =
    useState(false);

  const handleCreatedWorkingExperienceClicked = (values: any) => {
    updateFormValues(values);
    makeWorkingExperienceButtonActive(values.id);
  };

  const makeWorkingExperienceButtonActive = useCallback(
    (id: string) => {
      removeActiveClass("working-experience");
      const button = document.querySelector(`[id="${id}"] > button`);
      button?.classList.add("active");
    },
    [removeActiveClass]
  );

  useEffect(() => {
    if (workingExperienceWasDeleted) {
      const nextActiveButton = document.querySelector(
        ".working-experience .created-groups div:last-child"
      );
      if (nextActiveButton) {
        makeWorkingExperienceButtonActive(nextActiveButton.id);
        setWorkingExperienceWasDeleted(false);
      }
    }
  }, [
    workingExperiencesArray,
    makeWorkingExperienceButtonActive,
    workingExperienceWasDeleted,
  ]);

  const deleteWorkingExperience = (id: string) => {
    if (workingExperiencesArray.length < 2) {
      return;
    }
    const newArray = workingExperiencesArray;
    const index = newArray.findIndex((item) => item.id === id);
    newArray.splice(index, 1);

    callback("working-experience", newArray);

    setWorkingExperienceWasDeleted(true);
  };

  const addNewWorkingExperience = () => {
    const newWorkingExperience = { ...initValues(), id: uuidv4() };
    callback("working-experience", [
      ...workingExperiencesArray,
      newWorkingExperience,
    ]);
    updateFormValues(newWorkingExperience);
    removeActiveClass("working-experience");
  };

  const handleChange = (name: string, value: any) => {
    const currentActiveButton = document.querySelector(
      ".working-experience button.active"
    );

    const activeWorkingEducationIndex = workingExperiencesArray.findIndex(
      (experience) => experience.id === currentActiveButton?.parentElement?.id
    );

    if (activeWorkingEducationIndex === -1) {
      return;
    }

    const updatedWorkingExperiencesArray = [...workingExperiencesArray];
    (updatedWorkingExperiencesArray[activeWorkingEducationIndex] as any)[name] =
      value;
    callback("working-experience", updatedWorkingExperiencesArray);
  };

  const updateFormValues = useCallback((values: WorkingExperienceData) => {
    const setElementValue = (id: string, value: string | undefined) => {
      const element = document.getElementById(id) as HTMLInputElement | null;
      if (element) {
        element.value = value || "";
      }
    };

    setElementValue("company-name", values.companyName);
    setElementValue("work-location", values.workLocation);
    setElementValue("position-title", values.positionTitle);
    setElementValue("work-start-date", values.workStartYear);
    setElementValue("work-end-date", values.workEndYear);
    setElementValue("description", values.description);
  }, []);

  return (
    <div className="working-experience">
      <h1>Working experience</h1>
      <div className="created-groups">
        <CreatedWorkingExperiences
          workingExperiencesArray={workingExperiencesArray}
          handleCreatedWorkingExperienceClicked={
            handleCreatedWorkingExperienceClicked
          }
          deleteWorkingExperience={deleteWorkingExperience}
        />
      </div>
      <div className="form">
        <InputItem
          id="company-name"
          type="text"
          label="Company name"
          name="companyName"
          callback={handleChange}
        />
        <InputItem
          id="position-title"
          type="text"
          label="Position title"
          name="positionTitle"
          callback={handleChange}
        />
        <InputItem
          id="work-start-date"
          type="date"
          label="Start date"
          name="workStartYear"
          callback={handleChange}
        />
        <InputItem
          id="work-end-date"
          type="date"
          label="End date"
          name="workEndYear"
          callback={handleChange}
        />
        <InputItem
          id="work-location"
          type="text"
          label="Location"
          name="workLocation"
          callback={handleChange}
        />
        <InputItem
          id="description"
          type="textarea"
          label="Description"
          name="description"
          callback={handleChange}
          maxLength={200}
        />
      </div>
      <AddNewButton
        mode={"working-experience"}
        addNew={addNewWorkingExperience}
      />
    </div>
  );
}
