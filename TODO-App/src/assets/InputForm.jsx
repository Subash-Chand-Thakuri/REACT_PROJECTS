import logoImg from "./logo.png";
import PropTypes from "prop-types"
import {useState} from 'react'


function InputForm({getTask}) {
  const [data,setData] = useState('');

  const handleTask = (e) =>{
    e.preventDefault();
    getTask(data);
    // console.log("from input data onclick:",data)
  }

  const handleData = (e) =>{
    e.preventDefault();
    setData(e.target.value)
    // console.log("from input data onchange:",e.target.value)
  }

  

  return (
    <div>
      <h1 className="font-bold text-center my-5">ToDo List</h1>
      <div className="flex items-center">
        <div className="flex-grow border-t-2 border-black my-6 ml-12"></div>
        <img src={logoImg} alt="Logo" className="mx-4 h-14 w-12" />

        <div className="flex-grow border-t-2 border-black my-6 mr-12"></div>
      </div>

      <form className="flex ">
        <input
          id="input"
          className="block ml-8 flex-grow border-2 border-black p-2 rounded"
          type="text"
          placeholder="Enter the task..."
          value={data}
          onChange={handleData}
        />
        <button
          id="inputBtn"
          className="block flex-grow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 border border-solid border-black mr-80 " onClick={handleTask}
        >
          ADD
        </button>
      </form>
    </div>
  );
}

InputForm.propTypes = {
  getTask: PropTypes.func.isRequired,
}

export default InputForm;
