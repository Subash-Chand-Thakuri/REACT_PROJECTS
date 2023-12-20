
import { useState } from 'react'
import './App.css'
import InputForm from './assets/InputForm'
import OutputData from './assets/OutputData'


function App() {
  const [taskArr,setTaskArr] = useState([]);
  const getTask = (data) =>{
    setTaskArr(prev=>[...prev,{
      id: new Date(),
      content: data,
      done: false,
      pin: false,
    }] );
  }

  console.log('from app data: ',taskArr)
  return (
    <div className="">
        <InputForm getTask={getTask} />
        {taskArr && <OutputData taskArr={taskArr}  setTaskArr={setTaskArr} />}
    </div>
  )
}

export default App
