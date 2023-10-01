import React from "react";
import InputItem from "../InputItem";
import { v4 as uuidv4 } from "uuid";
import "../../styles/Education.css";
import "../../styles/CreatedGroup.css";
import { useState, useEffect, useCallback } from "react";
import CreatedEducations from "./CreatedEducations";
import AddNewButton from "../AddNewButton";
import { EducationData } from "../../types";

interface EducationProps {
  educationsArray: EducationData[];
  callback: (mode: string, data: any) => void;
  removeActiveClass: (id: string) => void;
  initValues: () => EducationData;
}

export default function Education({
  educationsArray,
  callback,
  removeActiveClass,
  initValues,
}: EducationProps) {
  const [educationWasDeleted, setEducationWasDeleted] = useState(false);

  const handleChange = (name: string, value: any) => {
    const currentActiveButton = document.querySelector(
      ".education button.active"
    );

    const activeEducationIndex = educationsArray.findIndex(
      (education) => education.id === currentActiveButton?.parentElement?.id
    );

    if (activeEducationIndex === -1) {
      return;
    }

    const updatedEducationsArray = [...educationsArray];
    (updatedEducationsArray[activeEducationIndex] as any)[name] = value;
    callback("education", updatedEducationsArray);
  };

  const updateFormValues = useCallback((values: EducationData) => {
    const setElementValue = (id: string, value: string | undefined) => {
      const element = document.getElementById(id) as HTMLInputElement | null;
      if (element) {
        element.value = value || "";
      }
    };

    setElementValue("school", values.school);
    setElementValue("location", values.location);
    setElementValue("degree", values.degree);
    setElementValue("field-of-study", values.fieldOfStudy);
    setElementValue("start-date", values.educationStartYear);
    setElementValue("end-date", values.educationEndYear);
  }, []);

  const handleCreatedEducationClicked = (values: EducationData) => {
    updateFormValues(values);
    updateActiveTab(values.id);
  };

  const updateActiveTab = useCallback(
    (id: string) => {
      const button = document.querySelector(`[id="${id}"] > button`);
      if (!button) {
        return;
      }
      removeActiveClass("education");
      button.classList.add("active");
      updateFormValues(
        educationsArray[educationsArray.findIndex((item) => item.id === id)]
      );
    },
    [removeActiveClass, updateFormValues, educationsArray]
  );

  useEffect(() => {
    if (educationWasDeleted) {
      const nextActiveButton = document.querySelector(
        ".education .created-groups div:last-child"
      );
      if (nextActiveButton) {
        updateActiveTab(nextActiveButton.id);
        setEducationWasDeleted(false);
      }
    }
  }, [educationsArray, updateActiveTab, educationWasDeleted]);

  const addNewEducation = () => {
    const newEducation = { ...initValues(), id: uuidv4() };
    callback("education", [...educationsArray, newEducation]);
    updateFormValues(newEducation);
    removeActiveClass("education");
  };

  const deleteEducation = (id: string) => {
    if (educationsArray.length < 2) {
      return;
    }
    const newArray = educationsArray;
    const index = newArray.findIndex((item) => item.id === id);
    newArray.splice(index, 1);

    callback("education", newArray);
    setEducationWasDeleted(true);
  };

  return (
    <div className="education">
      <h1>Education</h1>
      <div className="created-groups">
        <CreatedEducations
          educationsArray={educationsArray}
          handleCreatedEducationClicked={handleCreatedEducationClicked}
          deleteEducation={deleteEducation}
        />
      </div>
      <div className="form">
        <InputItem
          id="school"
          type="text"
          label="School"
          name="school"
          callback={handleChange}
        />
        <InputItem
          id="location"
          type="text"
          label="Location"
          name="location"
          callback={handleChange}
        />
        <InputItem
          id="degree"
          type="text"
          label="Degree"
          name="degree"
          callback={handleChange}
        />
        <InputItem
          id="field-of-study"
          type="text"
          label="Field of study"
          name="fieldOfStudy"
          callback={handleChange}
        />
        <InputItem
          id="start-date"
          type="date"
          label="Start date"
          name="educationStartYear"
          callback={handleChange}
        />
        <InputItem
          id="end-date"
          type="date"
          label="End date"
          name="educationEndYear"
          callback={handleChange}
        />
      </div>
      <AddNewButton mode={"education"} addNew={addNewEducation} />
    </div>
  );
}
