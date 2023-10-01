import PropTypes from "prop-types";
import InputItem from "../InputItem";
import "../../styles/Education.css";
import "../../styles/CreatedGroup.css";
import { useState, useEffect, useCallback } from "react";
import CreatedEducations from "./CreatedEducation";
import uuid from "react-uuid";
import AddNewButton from "../AddNewButton";

export default function Education({
  educationsArray,
  callback,
  removeActiveClass,
  initValues,
}) {
  const [educationWasDeleted, setEducationWasDeleted] = useState(false);

  const handleChange = (name, value) => {
    const updatedEducationsArray = [...educationsArray];
    const currentId = document.querySelector(".education button.active")
      .parentElement.id;
    const educationToUpdate = updatedEducationsArray.find(
      (education) => education.id === currentId
    );
    educationToUpdate[name] = value;
    callback("education", updatedEducationsArray);
  };

  const updateFormValues = useCallback((values) => {
    document.getElementById("school").value = values.school;
    document.getElementById("location").value = values.location;
    document.getElementById("degree").value = values.degree;
    document.getElementById("field-of-study").value = values.fieldOfStudy;
    document.getElementById("start-date").value = values.educationStartYear;
    document.getElementById("end-date").value = values.educationEndYear;
  }, []);

  const handleCreatedEducationClicked = (values) => {
    updateFormValues(values);
    updateActiveTab(values.id);
  };

  const updateActiveTab = useCallback(
    (id) => {
      removeActiveClass("education");
      const button = document.querySelector(`[id="${id}"] > button`);
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
    var newEducation = { ...initValues(), id: uuid() };
    callback("education", [...educationsArray, newEducation]);
    updateFormValues(newEducation);
    removeActiveClass("education");
  };

  const deleteEducation = (id) => {
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

Education.propTypes = {
  educationsArray: PropTypes.array,
  callback: PropTypes.func,
  addNewEducation: PropTypes.func,
  deleteEducation: PropTypes.func,
  makeEducationButtonActive: PropTypes.func,
  removeActiveClass: PropTypes.func,
  initValues: PropTypes.func,
};
