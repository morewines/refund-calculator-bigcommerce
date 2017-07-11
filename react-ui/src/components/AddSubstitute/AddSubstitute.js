import React from 'react';

//CSS
import './AddSubstitute.css';

//Modules
import FaPlus from 'react-icons/lib/fa/plus';

const AddSubstitute = ({
    substituteItemWeight,
    substituteItemName,
    substituteItemPrice,
    substituteItemQty,
    handleSubstituteWeightChange,
    handleSubstituteInputChange
  }) => {

  return (
    <div>
      <h4>Add Substitute Item</h4>
      <div className="row">
        <div className="column column-75">
          <form>
            <label htmlFor="item-name">Item Name</label>
            <input name="substituteItemName"
              value={substituteItemName}
              onChange={handleSubstituteInputChange}
              type="text" placeholder="" id="item-name" />
            <div className="row">
              <div className="column">
                <label htmlFor="item-price">Price</label>
                <input name="substituteItemPrice"
                  value={substituteItemPrice}
                  onChange={handleSubstituteInputChange}
                  type="number" placeholder="" id="item-price" />
              </div>
              <div className="column">
                <fieldset>
                  <label htmlFor="item-weight">Item Weight</label>
                    <select value={substituteItemWeight}
                      onChange={handleSubstituteWeightChange}
                      id="item-weight">
                      <option value="3.5">3.5lbs</option>
                      <option value="4">4lbs</option>
                    </select>
                </fieldset>
              </div>
              <div className="column">
                <label htmlFor="item-qty">Qty</label>
                <input name="substituteItemQty"
                  value={substituteItemQty}
                  onChange={handleSubstituteInputChange}
                  type="number" placeholder="" id="item-qty" />
              </div>
            </div>
            <button className="button-primary button-mw button-space"
              type="submit">
              <FaPlus size={18} style={{
                marginBottom: '3px',
                marginRight: '1em'
              }} />
              Add Substitute Item
            </button>
          </form>
        </div>
        <div className="column column-25">
          <div className="fake-label">Reminders</div>
          <p>Enter price and qty as numbers</p>
        </div>
      </div>
    </div>
  )
}

export default AddSubstitute;