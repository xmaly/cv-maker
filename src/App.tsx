import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Education from "./components/EducationForm/Education";
import TopBar from "./components/TopBar";
import PersonalDetails from "./components/PersonalDetails";
import Preview from "./components/Preview/Preview";
import WorkingExperience from "./components/WorkingExpericenceForm/WorkingExperience";
import {
  EducationData,
  WorkingExperienceData,
  PersonalDetailsData,
} from "./types";
import "./styles/App.css";

function App() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsData>({
    fullName: "Full Name",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const initEducation = (): EducationData => ({
    school: "My School",
    degree: "",
    fieldOfStudy: "",
    educationStartYear: "2017-01-01",
    educationEndYear: "2020-01-01",
    location: "",
    id: uuidv4(),
  });

  const initWorkingExperience = (): WorkingExperienceData => ({
    companyName: "Company",
    positionTitle: "",
    workStartYear: "2020-01-01",
    workEndYear: "2023-01-01",
    workLocation: "",
    description: "",
    id: uuidv4(),
  });

  const [educationsArray, setEducationsArray] = useState<EducationData[]>([
    initEducation(),
  ]);
  const [workingExperiencesArray, setWorkingExperiencesArray] = useState<
    WorkingExperienceData[]
  >([initWorkingExperience()]);

  const handleChange = (mode: string, data: any) => {
    switch (mode) {
      case "personal-details":
        setPersonalDetails(data);
        break;
      case "education":
        setEducationsArray([...data]);
        break;
      case "working-experience":
        setWorkingExperiencesArray([...data]);
        break;
      default:
        console.error(
          "Non-existing mode received when updating the original data."
        );
    }
  };

  const removeActiveClass = (mode: string) => {
    const elements = document.querySelectorAll(`.${mode} .active`);
    elements.forEach((e) => {
      e.classList.remove("active");
    });
  };

  return (
    <>
      <TopBar />
      <div className="content">
        <div className="forms">
          <PersonalDetails
            personalDetails={personalDetails}
            callback={handleChange}
          />
          <Education
            educationsArray={educationsArray}
            callback={handleChange}
            removeActiveClass={removeActiveClass}
            initValues={initEducation}
          />
          <WorkingExperience
            workingExperiencesArray={workingExperiencesArray}
            removeActiveClass={removeActiveClass}
            callback={handleChange}
            initValues={initWorkingExperience}
          />
        </div>
        <Preview
          personalDetails={personalDetails}
          educationsArray={educationsArray}
          workingExperiencesArray={workingExperiencesArray}
        />
      </div>
    </>
  );
}

export default App;
