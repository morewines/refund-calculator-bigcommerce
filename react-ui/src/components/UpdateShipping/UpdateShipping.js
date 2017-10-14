import React from 'react';

//CSS
import './UpdateShipping.css';

//Modules
import FaEdit from 'react-icons/lib/fa/edit';

const UpdateShipping = ({
  updateShippingCost,
  handleShippingCostUpdate,
  handleShippingSubmit
}) => {
  return (
    <div className="update-shipping-wrapper">
      <h4>Update Shipping Cost</h4>
      <div className="row">
        <div className="column column-75">
          <form className="shipping-form" onSubmit={handleShippingSubmit}>
            <label htmlFor="shipping-cost">Shipping Cost</label>
            <input
              name="updateShippingCost"
              value={updateShippingCost}
              onChange={handleShippingCostUpdate}
              type="text"
              placeholder="Ex: 15.79"
              id="item-name"
              autoFocus
              required
            />
            <button
              className="button-primary button-mw
              button-space-shipping"
              type="submit"
            >
              <FaEdit
                size={18}
                style={{
                  marginBottom: '3px',
                  marginRight: '1em'
                }}
              />
              Update Shipping Cost
            </button>
          </form>
        </div>
        <div className="column column-25">
          <div className="fake-label">Reminders</div>
          <p>
            Calculate the cost of shipping for all products customer is{' '}
            <b>keeping</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateShipping;
