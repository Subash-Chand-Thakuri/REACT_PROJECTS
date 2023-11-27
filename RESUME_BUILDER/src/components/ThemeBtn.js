import React from 'react'

function ThemeBtn({toggleTheme}) {
  return (
    <div>
        <button onClick={toggleTheme} style={{display:'inline-block'}} >Toggle Me</button>
    </div>
  )
}

export default ThemeBtn