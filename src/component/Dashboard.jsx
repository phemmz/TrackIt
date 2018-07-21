import React from 'react';

export default class Dashboard extends React.Component {

  handleInputChange = () => {
    console.log('hhhh')
  }
  render() {
    return (
      <div className="dasboard__container">
        <div className="side__nav">
          <a>Logo</a>
          <a>Add Shipment</a>
          <a>View All Shipments</a>
          <a><i className="fa fa-bell" aria-hidden="true"></i></a>
        </div>
        <div className="add__shipment__card">
          <h4 className="text-center">Add New Shipment</h4>
          <div className="add__shipment__form">
            <form className="upload__pfi__section__form">
              <div className="form-group custom-file">
                <input
                  type="file"
                  className="custom-file-input upload__pfi__section"
                  id="pfiFile"
                  onChange={this.handleInputChange}
                />
                <label className="custom-file-label" htmlFor="customFile">Upload PFI</label>
              </div>
              <div className="form-group">
                <label htmlFor="pfiQuantity">Quantity</label>
                <input
                  type="password"
                  className="form-control"
                  id="pfiQuantity"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pfiCost">Cost</label>
                <input type="password" className="form-control" id="pfiCost" />
              </div>
              <div className="form-group">
                <label htmlFor="hsCode">HS Code</label>
                <input type="password" className="form-control" id="hsCode" />
              </div>
              <div className="form-group">
                <label htmlFor="itemsDetails">Items Details</label>
                <input type="password" className="form-control" id="itemsDetails" />
              </div>
              <div className="form-group">
                <label htmlFor="materialType">Type</label>
                <select className="form-control" id="materialType">
                  <option>Raw Material</option>
                  <option>Non-Raw Material</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Save PFI</button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
