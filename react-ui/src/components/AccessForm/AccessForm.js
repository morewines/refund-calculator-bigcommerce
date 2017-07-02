import React from 'react';
import SignIn from 'react-icons/lib/fa/sign-in';

//CSS
import './AccessForm.css';

const AccessForm = ({
  accessValue,
  handleAccessChange,
  handleAccessSubmit,
  accessPlaceholder
}) => {

  return (
    <div className="container access-form-container-wrapper">
      <form className="access-form-wrapper" onSubmit={handleAccessSubmit}>
        <fieldset>
          <input type="text" placeholder={accessPlaceholder}
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
        </fieldset>
      </form>
    </div>
  )
}

export default AccessForm;
