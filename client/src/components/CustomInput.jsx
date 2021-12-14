import React from 'react';
import "./CustomInput.scss";

function CustomInput({placeholder, value, setValue}) {
  return (
    <div className='customInputBox'>
      <input type="text" placeholder={placeholder} value={value} onChange = {e => setValue(e.target.value)} />
    </div>
  )
}

export default CustomInput;