import { useState, useReducer, createContext } from "react";
import ResumeEditor from "./components/ResumeEditor";
import RenderingData from "./components/RenderingData";
import html2pdf from "html2pdf.js";
import Button from "./components/Button";
import ThemeBtn from './components/ThemeBtn'
import "./App.css";

const ThemeContext = createContext('light')

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, [action.dataType]: [...state[action.dataType], action.payload] };
   
    case "DELETE":
      const newData = [...state[action.dataType]];
      newData.splice(action.index, 1);
      return {
        ...state,
        [action.dataType]: [...newData],
      };
    case "EDIT":
      const editExperience = [...state[action.dataType]];
      editExperience.splice(action.index, 1, { [action.dataType]: action.payload });
      return {
        ...state,
        [action.dataType]: [...editExperience],
      };
    default:
      return state;
  }
};

const initialState = {
  resume_name: [],
  experience: [],
  education: [],
  skill: [],
};

const App = () => {
  const [editdata, setEditData] = useState({});
  const [theme,setTheme] = useState('light');

  const toggleTheme = () =>{
    setTheme( theme === 'light'?'dark':'light' );
  };
  console.log('from app theme:',theme)

  const generatePDF = () => {
    const element = document.getElementById("secondChild");
    const options = {
      filename: "custom_filename.pdf",
    };

    html2pdf(element, options);
  };


  const [data,dispatch] = useReducer(dataReducer,initialState);

  function getData(value) {
    // console.log("from app:", value);

    switch (value.type) {
      case "experience":
        dispatch({type:"ADD",dataType:value.type,payload:value[value.type]});
        break;

      case "skill":
        dispatch({type:"ADD",dataType:value.type,payload:value[value.type]});
        break;

      case "education":
        dispatch({type:"ADD",dataType:value.type,payload:value[value.type]});
        break;
      case "resume_name":
        dispatch({type:"ADD",dataType:value.type,payload:value[value.type]});
        break;
      default:
        break;
    }
  }

  function deletedata(idx,dataType) {
   dispatch({type:"DELETE", dataType:dataType, index: idx})
  }
  const handleEdit = (idx, updatedData,dataType) => {
   dispatch({type:"EDIT",index:idx,payload:updatedData, dataType:dataType})
  };
  // console.log("from app the data: ",data)

  return (
    <>
      <div className="main_content">
        <div className="header"></div>
        <div className="parentContainer">
          <ResumeEditor getData={getData} setEditData={setEditData} />
          <div className="container" id="thirdChild"></div>
          <ThemeContext.Provider value={theme} >
          <RenderingData
            data={data}
            deletedata={deletedata}
            editdata={editdata}
            handleEdit={handleEdit}
          />
          </ThemeContext.Provider>

          <div style={{display:'inline-flex'}}>
          <Button generatePDF={generatePDF} />
          <ThemeBtn toggleTheme={toggleTheme} />
          </div>
          
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
};

export default App;
export { ThemeContext};
