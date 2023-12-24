import React from "react";
import UsersView from "./assets/UsersView"
import DataOutput from "./assets/DataOutput"
import './App.css'

function App(){
  const [users, setUsers] = React.useState([]);
  console.log("from app:",users)
  return(
    <>
      <UsersView users={users} setUsers ={setUsers} />
      <DataOutput users={users} />
    </>
  )
}

export default App
