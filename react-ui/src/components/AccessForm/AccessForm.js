import React from 'react';
import SignIn from 'react-icons/lib/fa/sign-in';

//CSS
import './AccessForm.css';

const AccessForm = ({accessValue, handleAccessChange, handleAccessSubmit}) => {

  const typeOne = (
    <div className="row">
      <div className="column center">
        <label htmlFor="nameField">Access #</label>
        <input type="text" placeholder="Enter #" id="nameField" />
      </div>
      <div className="column">
        <label htmlFor="commentField">Get Access</label>
        <input className="button-primary" type="submit" value="Send" />
      </div>
    </div>
  )

  const typeTwo = (
    <div>

      <input type="text" placeholder="Access #"
        id="nameField"
        value={accessValue}
        onChange={handleAccessChange}
      />

      <button className="button-primary button-mw" type="submit">
        <SignIn size={18} style={{
          marginBottom: '3px',
          marginRight: '1em'
        }} />
        Get Access
      </button>

    </div>
  )

  return (
    <div className="container access-form-container-wrapper">
      <form className="access-form-wrapper" onSubmit={handleAccessSubmit}>
        <fieldset>
          {typeTwo}
        </fieldset>
      </form>
    </div>
  )
}

export default AccessForm;
