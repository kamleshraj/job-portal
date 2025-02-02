import React from 'react'

const FormRow = ({type,name,value,handleChange,labelText}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input 
      type={type} 
      value={value} 
      name={name} 
      id={name} 
      onChange={handleChange}
      placeholder={name}
      className='form-input'
      />
    </div>
  )
}

export default FormRow