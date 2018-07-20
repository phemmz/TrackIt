import React from 'react';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dasboard__container">
        <div className="top__section">
          <a>Add Shipment</a>
          <a>View All Shipments</a>
          <a><i className="fa fa-bell" aria-hidden="true"></i></a>
        </div>
        <div className="add__shipment__card">
          <div className="upload__pfi__section">
            <button type="button" className="btn btn-primary">Upload PFI</button>
            <input />
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
