import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function OutputData({ taskArr, setTaskArr }) {
  const [edit, setEdit] = useState(false);
  const [complete, setComplete] = useState(0);
  const [values, setValues] = useState(taskArr.map((ele) => ele.content));

  useEffect(() => {
    setValues(taskArr.map((ele) => ele.content));
    const intervalId = setInterval(() => {
      console.log("Interval callback");
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [taskArr, edit]);

  const [clickCount, setClickCount] = useState(0); // a state to keep track of the number of clicks
  const [timer, setTimer] = useState(null); // a state to store the timer

  const handleClicks = (index) => {
    setClickCount(clickCount + 1); // increment the click count
    if (clickCount === 1) {
      // if this is the first click
      setTimer(
        setTimeout(() => {
          // set a timer to reset the click count after a delay
          setClickCount(0);
        }, 300)
      ); // 300 ms is a reasonable delay for double click detection
    } else if (clickCount === 2) {
      // if this is the second click
      clearTimeout(timer); // clear the timer
      setClickCount(0); // reset the click count
      DoubleClickHandler(index); // call the double click handler
    }
  };

  const DoubleClickHandler = (index) => {
    const updatedArr = [...taskArr];
    let temp = updatedArr.splice(index, 1);
    updatedArr.splice(0, 0, ...temp);
    setTaskArr(updatedArr);
  };

  console.log(taskArr);

  const handleClick = (index, value) => {
    switch (value) {
      case "Up":
        if (index > 0) {
          const updatedArr = [...taskArr];
          let temp = updatedArr.splice(index, 1);
          updatedArr.splice(index - 1, 0, ...temp);
          setTaskArr(updatedArr);
        }
        break;
      case "Down":
        if (index < taskArr.length - 1) {
          const updatedArr = [...taskArr];
          let temp = updatedArr.splice(index, 1);
          updatedArr.splice(index + 1, 0, ...temp);
          setTaskArr(updatedArr);
        }
        break;
      default:
        break;
    }
  };

  const handleDelete = (index) => {
    const updatedArr = [...taskArr];
    // updatedArr.splice(index,1);
    // setTaskArr([...updatedArr]);
    setTaskArr([...updatedArr.filter((_, i) => i !== index)]);
  };

  return (
    <div>
      {taskArr.length > 0 ? (
        <h1 className="text-center font-semibold text-xl font-mono">Tasks:</h1>
      ) : null}
      ;
      <div className="text-center">{`Task Completed: ${complete}/${taskArr.length}`}</div>
      <ul className="list-group max-w-md">
        {edit
          ? taskArr.map((ele, index) => (
              <li key={index} className="flex space-x-0 my-1 ">
                <form className="w-fit">
                  <input
                    type="text"
                    style={{ width: `${values.length * 8}px` }}
                    className="inline-block shadow-xl  ml-8 px-3 py-2  border-2 border-solid border-blue-300 rounded-full focus:border-gray-700 outline-none transition"
                    value={values[index]}
                    onChange={(e) => {
                      const newValues = [...values];
                      newValues[index] = e.target.value;
                      setValues(newValues);
                    }}
                  />

                  <button
                    className="shadow-xl border-2 border-solid border-gray-800 rounded px-3 py-1 hover:bg-slate-400"
                    onClick={(e) => {
                      e.preventDefault();

                      setTaskArr((prev) => {
                        const newTaskArr = [...prev];
                        newTaskArr[index] = {
                          ...newTaskArr[index],
                          content: values[index],
                        };
                        return newTaskArr;
                      });
                      setEdit(false);
                    }}
                  >
                    Save
                  </button>
                </form>
              </li>
            ))
          : taskArr.map((ele, index) => (
              <li key={index} className="flex space-x-0 my-1">
                <div
                  id={`task-${index}`}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    ele.pin = !ele.pin;
                    handleClicks(index);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    ele.done !== true
                      ? setComplete((complete) => complete + 1)
                      : setComplete((complete) => complete);
                    ele.done = true;
                  }}
                  className={`shadow-xl max-w-7xl ml-8 px-3 py-2 inline-block border-2 border-solid border-blue-300 rounded-full focus:border-gray-700 outline-none transition ${
                    ele.pin
                      ? "bg-yellow-400"
                      : ele.done
                      ? "bg-green-500"
                      : "bg-slate-50"
                  }`}
                >
                  {ele.content}
                </div>
                <button
                  className="shadow-xl border-2 border-solid border-blue-500 rounded hover:bg-slate-400 px-3 py-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="shadow-xl border-2 border-solid border-blue-500 rounded hover:bg-slate-400 px-3 py-1"
                  onClick={() => {
                    handleClick(index, "Up");
                  }}
                  onKeyUp={() => {
                    handleClick(index, "Up");
                  }}
                >
                  Up
                </button>
                <button
                  className="shadow-xl border-2 border-solid border-gray-800 rounded px-3 py-1 hover:bg-slate-400"
                  onClick={() => {
                    handleClick(index, "Down");
                  }}
                  onKeyDown={() => {
                    handleClick(index, "Down");
                  }}
                >
                  Down
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="border-2 border-gray-600 bg-green-600 hover:bg-green-900 hover:border-gray-200 shadow-2xl border-solid rounded px-3 py-1"
                >
                  Delete
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}

OutputData.propTypes = {
  taskArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTaskArr: PropTypes.any.isRequired,
};

export default OutputData;
