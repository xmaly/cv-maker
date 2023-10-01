import PropTypes from "prop-types";
import CreatedWorkingExperiences from "./CreatedWorkingExperiences";
import InputItem from "../InputItem";
import "../../styles/WorkingExperience.css";
import "../../styles/CreatedGroup.css";
import { useState, useEffect, useCallback } from "react";
import uuid from "react-uuid";
import AddNewButton from "../AddNewButton";

export default function WorkingExperience({
  workingExperiencesArray,
  removeActiveClass,
  callback,
  initValues,
}) {
  const [workingExperienceWasDeleted, setWorkingExperienceWasDeleted] =
    useState(false);

  const handleCreatedWorkingExperienceClicked = (values) => {
    setFormValues(values);
    makeWorkingExperienceButtonActive(values.id);
  };

  const makeWorkingExperienceButtonActive = useCallback(
    (id) => {
      removeActiveClass("working-experience");
      const button = document.querySelector(`[id="${id}"] > button`);
      button.classList.add("active");
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

  const deleteWorkingExperience = (id) => {
    if (workingExperiencesArray.length < 2) {
      return;
    }
    const newArray = workingExperiencesArray;
    const index = newArray.findIndex((item) => item.id === id);
    newArray.splice(index, 1);

    callback("working-experience", newArray);

    setWorkingExperienceWasDeleted(true);
  };

  const handleChange = (name, value) => {
    const updatedWorkingExperiencesArray = [...workingExperiencesArray];
    const currentId = document.querySelector(
      ".working-experience button.active"
    ).parentElement.id;
    const workingExperienceToUpdate = updatedWorkingExperiencesArray.find(
      (experience) => experience.id === currentId
    );

    workingExperienceToUpdate[name] = value;
    callback("working-experience", updatedWorkingExperiencesArray);
  };

  const addNewWorkingExperience = () => {
    var newWorkingExperience = { ...initValues(), id: uuid() };
    callback("working-experience", [
      ...workingExperiencesArray,
      newWorkingExperience,
    ]);
    setFormValues(newWorkingExperience);
    removeActiveClass("working-experience");
  };

  const setFormValues = (values) => {
    document.getElementById("company-name").value = values.companyName;
    document.getElementById("position-title").value = values.positionTitle;
    document.getElementById("work-start-date").value = values.workStartYear;
    document.getElementById("work-end-date").value = values.workEndYear;
    document.getElementById("work-location").value = values.workLocation;
    document.getElementById("description").value = values.description;
  };

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

WorkingExperience.propTypes = {
  workingExperiencesArray: PropTypes.array,
  removeActiveClass: PropTypes.func,
  callback: PropTypes.func,
  initValues: PropTypes.func,
};
