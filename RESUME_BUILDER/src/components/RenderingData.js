import React,{useContext} from 'react'
import { ThemeContext } from "../App";

function RenderingData({ data, deletedata, editdata ,handleEdit }) {
  console.log("from renderingData data.experience: ",data.experience)

  const handleDelete = (index,dataType) => {
    deletedata(index,dataType);
  };
  const handleUpdate = (index,dataType) => {
    handleEdit(index,editdata,dataType);
  };

  const theme = useContext(ThemeContext);
  console.log('from  renderin theme:',theme)

  return (
    <div id="secondChild" className={`container-${theme === 'dark' ? 'dark-theme': 'light-theme' }`}>
      <br />
      <h1 style={{ display: "inline" }}>Name:</h1>
      {Array.isArray(data.resume_name) &&
        data.resume_name.map((name, index) => (
          <h1 style={{ display: "inline" }} key={index}>
            {name.resume_name}
          </h1>
        ))}
      <br />
      <br />

      <hr />
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <div className="">
          <h3>Experience:</h3>
        </div>
        {Array.isArray(data.experience) &&
          data.experience.map((exp, index) => (
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <li>{exp.experience}</li>

              <div className="" style={{ display: "flex", gap: "6px" }}>
                <button type="button" onClick={(e) => handleUpdate(index,'experience')}>
                  update
                </button>
                <button type="button" onClick={(e) => handleDelete(index,"experience")}>
                  delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <h3>Skills:</h3>
      {Array.isArray(data.skill) &&
        data.skill.map((skil, index) => <li key={index}>{skil.skill}</li>)}
      <h3>Education:</h3>
      {Array.isArray(data.education) &&
        data.education.map((edu, index) => (
          <li key={index}>{edu.education}</li>
        ))}
    </div>
  );
}

export default RenderingData;
