import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

function Button({generatePDF}) {
  return (
    
    <div><button onClick={generatePDF}><FontAwesomeIcon icon={faFilePdf} /></button></div>
  )
}

export default Button