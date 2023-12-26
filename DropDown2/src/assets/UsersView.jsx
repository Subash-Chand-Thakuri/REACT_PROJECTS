import { useState, useEffect } from "react";
import Data from "./data";
import "./Users.css";
import PropTypes from "prop-types";

function UsersView({ users, setUsers }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCityDropDown, setShowCityDropDown] = useState(false);
  const [dropStyle, setDropStyle] = useState();

  useEffect(() => {
    localStorage.setItem("selectedCountry", selectedCountry);
    console.log("Value stored in localStorage:", selectedCountry);
  }, [selectedCountry]);

  function handleSelectCountry(event) {
    event.preventDefault();
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setShowCityDropDown(!!selectedCountry);
    setDropStyle("block");
  }

  const handleSetUsers = (country, city) => {
    const newUser = [...users];
    setUsers([
      ...newUser,
      {
        country: country,
        city: city,
      },
    ]);
    setDropStyle("none");
  };

  return (
    <div>
      <div className="select-container">
        <label htmlFor="dropdown">Choose the country:</label>
        <select id="dropdown" onChange={handleSelectCountry}>
          <option>---SELECT---</option>
          {Data.map((item, index) => (
            <option key={index} value={item.country}>
              {item.country}
            </option>
          ))}
        </select>
      </div>
      {Data.map(
        (item) =>
          showCityDropDown &&
          selectedCountry === item.country && (
            <div
              key={item.id}
              style={{ display: dropStyle }}
              className="dropdown-container"
            >
              {item.city.map((ele, idx) => {
                return (
                  <>
                    <ul
                      key={idx}
                      onClick={() => handleSetUsers(item.country, ele)}
                    >
                      <li>{ele}</li>
                    </ul>
                  </>
                );
              })}
            </div>
          )
      )}
    </div>
  );
}

UsersView.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default UsersView;
