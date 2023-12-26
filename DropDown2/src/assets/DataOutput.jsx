// import React from 'react'
import PropTypes from "prop-types"

function DataOutput({users}) {
    console.log("from out:",users)
  return (
    <div>
      { users.length > 0 && <h2>Your data is:</h2>}
        {users.map((item,index)=>{
            return (
                <p key={index}><b>Country:</b>{item.country}   <b>City:</b>{item.city} </p>
            )
        })}
    </div>
  )
}

DataOutput.propTypes = {
    users : PropTypes.array.isRequired,
}

export default DataOutput