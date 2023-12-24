import  { useState } from "react";
import Data from './data'
import "./Users.css";
import PropTypes from "prop-types"

function UsersView({users,setUsers}) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCityDropDown, setShowCityDropDown] = useState(false);

  function handleSelectCountry(event) {
    event.preventDefault();
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setShowCityDropDown(!!selectedCountry)
  }
  
 const handleSetUsers = (country,city) => {
   const newUser = [...users];
   setUsers([
    ...newUser,{
      country: country,
      city: city,
    }]
   )
 }

  return (
    <div>
      <label htmlFor="dropdown">Choose the country:</label>
      <select id="dropdown" onChange={handleSelectCountry}>
        <option>---SELECT---</option>
        {Data.map((item, index) => (
          <option key={index} value={item.country} >
            {item.country}
          </option>
        ))}
      </select>

      {Data.map((item) => (
        showCityDropDown && selectedCountry === item.country && (
          <div key={item.id} style={{ display: "inline-block" }}>
            <label htmlFor="citydropdown">Select City:</label>
            <select id="citydropdown" onChange={(e)=>{
              e.preventDefault()
                handleSetUsers(selectedCountry, e.target.value)
               }}>
                <option>--Select--</option>
             {item.city.map((ele,index)=>(
               <option key={index} className="drop" value={ele} >
               {ele}
             </option>
             ))}
            </select>
          </div>
        )
      ))}
    </div>
  );
}

UsersView.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default UsersView;
