import { useState } from "react";
import PersonalDetails from "./components/PersonalDetails";
import Education from "./components/EducationForm/Education";
import Preview from "./components/Preview/Preview";
import TopBar from "./components/TopBar";
import "./styles/App.css";
import uuid from "react-uuid";
import WorkingExperience from "./components/WorkingExpericenceForm/WorkingExperience";

function App() {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "Full Name",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const initEducation = () => {
    return {
      school: "My School",
      degree: "",
      fieldOfStudy: "",
      educationStartYear: "2017-09-01",
      educationEndYear: "2020-09-01",
      location: "",
      id: uuid(),
    };
  };

  const initWorkingExperience = () => {
    return {
      companyName: "Company",
      positionTitle: "",
      workStartYear: "2020-09-01",
      workEndYear: "2023-09-01",
      workLocation: "",
      description: "",
      id: uuid(),
    };
  };

  const [educationsArray, setEducationsArray] = useState([initEducation()]);
  const [workingExperiencesArray, setWorkingExperiencesArray] = useState([
    initWorkingExperience(),
  ]);

  const handleChange = (mode, data) => {
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
        console.log(
          "Non-existing mode received when updating the original data."
        );
    }
  };

  const removeActiveClass = (mode) => {
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
          callback={handleChange}
        />
      </div>
    </>
  );
}

export default App;
