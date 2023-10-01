export default function CreatedEducations({
  handleCreatedEducationClicked,
  educationsArray,
  deleteEducation,
}) {
  return educationsArray.map((education) => (
    <div className="created-group" id={education.id} key={education.id}>
      <button
        className="active"
        onClick={() => handleCreatedEducationClicked(education)}
      >
        {education.school ? education.school : "New education"}
      </button>
      <span
        className={`material-symbols-outlined remove ${
          educationsArray.length < 2 ? "grey" : "red"
        }`}
        onClick={() => deleteEducation(education.id)}
      >
        cancel
      </span>
    </div>
  ));
}
