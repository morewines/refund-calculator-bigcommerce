import React from 'react';

//CSS
import './AccessForm.css';

const AccessForm = ({}) => {

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
      <label htmlFor="nameField">Access #</label>
      <input type="text" placeholder="..." id="nameField" />
      <label htmlFor="commentField">Get Access</label>
      <input className="button-primary button-mw" type="submit" value="Send" />
    </div>
  )

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('submitted')
  }


  return (
    <div className="container access-form-container-wrapper">
      <form className="access-form-wrapper" onSubmit={handleSubmit}>
        <fieldset>
          {typeTwo}
        </fieldset>
      </form>
    </div>
  )
}

export default AccessForm;
