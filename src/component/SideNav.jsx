import React from 'react';
import { Link } from 'react-router-dom';

export default function SideNav() {
  return (
    <div className="side__nav">
      <Link to="/">
        <img height="50px" width="50px" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/1200px-Unilever.svg.png" />
      </Link>
      <hr />
      <div>
        <Link to="/dashboard" data-tip="Add Shipment"><i className="far fa-plus-square"></i></Link>
      </div>
      <hr />
      <div>
        <Link to="/view-shipment" data-tip="View All Shipments"><i className="fas fa-shipping-fast"></i></Link>
      </div>
      <hr />
      <div>
        <a><i className="fa fa-bell" aria-hidden="true"></i></a>
      </div>
    </div>
  );
}
