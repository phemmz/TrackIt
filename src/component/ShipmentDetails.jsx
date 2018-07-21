import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

export default class ShipmentDetails extends Component {
    render() {
      return (
        <div className="dasboard__container">
          <ReactTooltip />
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
                  <Link to="/shipments" data-tip="View All Shipments"><i className="fas fa-shipping-fast"></i></Link>
              </div>
              <hr />
              <div>
                  <a><i className="fa fa-bell" aria-hidden="true"></i></a>
              </div>
            </div>
            <div>
                
            </div>
          </div>
        );
    }
}
