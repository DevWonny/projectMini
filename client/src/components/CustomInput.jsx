import React from 'react';

function CustomInput({label, value, setValue}) {
  return (
    <div style={{marginBottom : "20px"}}>
      <label>{label}</label>
      <input type="text" value={value} onChange = {e => setValue(e.target.value)} />
    </div>
  )
}

export default CustomInput;