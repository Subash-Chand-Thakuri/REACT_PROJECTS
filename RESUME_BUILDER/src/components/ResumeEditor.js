import React, { useState } from "react";

function ResumeEditor({ getData,setEditData }) {
  const [experience, setExperience] = useState({});
  const [skill, setSkill] = useState({});
  const [education, setEducation] = useState({});
  const [resume_name, setName] = useState({});

  //simplify the add functions to single for  all
  const handleAdd = (e) => {
    e.preventDefault();
    let data = {};
    data.type = e.target.name;
    switch (data.type) {
      case "experience":
        if(setEditData){
          setEditData(data[e.target.name] = experience)
        }else{
        data[e.target.name] = experience;
        }
        break;
      case "skill":
        data[e.target.name] = skill;
        break;
      case "education":
        data[e.target.name] = education;
        break;
      case "resume_name":
        data[e.target.name] = resume_name;
        break;
      default:
        break;
    }
    getData(data);
  };

  const handleChange =(e)=>{
    e.preventDefault();
    switch(e.target.name){
      case 'experience': setExperience({ ...experience, [e.target.name]: e.target.value });
      break;
      case 'skill': setSkill({ ...skill, [e.target.name]: e.target.value });
      break;
      case 'education': setEducation({ ...education, [e.target.name]: e.target.value });
      break;
      case 'resume_name': setName({ ...resume_name, [e.target.name]: e.target.value });
      break;
      default:
         break;
    }
    setEditData(e.target.value);
  }

  return (
    <div className="resume">
      <form>
        <label>Name:</label>
        <br />
        <button name="resume_name" onClick={handleAdd}>
          ADD
        </button>
        <input
          type="text"
          className="resume_name"
          name="resume_name"
          onChange={handleChange}
        />
        <br />
        <label>Experience:</label>
        <br />
        <input
          type="button"
          value="ADD"
          name="experience"
          onClick={handleAdd}
        />
        <input
          type="text"
          className="experience"
          name="experience"
          onChange={handleChange}
        />
        <br />
        <label>Skills:</label>
        <br />
        <button name="skill" add_op={skill} onClick={handleAdd}>
          ADD
        </button>
        <input
          type="text"
          name="skill"
          className="skill"
          onChange={handleChange}
        />
        <br />
        <label>Education:</label>
        <br />
        <button name="education" onClick={handleAdd}>
          ADD
        </button>
        <input
          type="text"
          className="education"
          name="education"
          onChange={handleChange}
        />
        <br />
      </form>
    </div>
  );
}

export default ResumeEditor;
