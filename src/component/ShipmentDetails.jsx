import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

import decodeToken from '../helper/decodeToken';

export default class ShipmentDetails extends Component {

  componentDidMount() {
    const auth_token = localStorage.getItem('auth_token');
    const decodedToken = decodeToken({
      data: {
        auth_token
      }
    });

    if (decodedToken === 'unauthorised') {
      this.props.history.push('/');
    }
  }

    render() {
      return (
        <div className="shipment__container">
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
              <Link to="/analytics" data-tip="Analytics"><i className="fas fa-chart-line"></i></Link>
            </div>
            <hr />
            <div>
                <a><i className="fa fa-bell" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="m-content">
            <h2>Shipment Detail</h2>
            
            <ul className="m-timeline">
              <li>
                <div className="m-timeline__date">
                  PFI
                </div>

                <div>
                  Begin building websites.
                </div>
              </li>

              <li>
                <div className="m-timeline__date">
                  FORM M
                </div>

                <p>Learning basic HTML and CSS</p>
              </li>

              <li>
                <div className="m-timeline__date">
                  PERMITS
                </div>

                <p>
                  Working as a freelancer and building websites for clients on a regular basis.
                </p>
              </li>

              <li>
                <div className="m-timeline__date">
                  2005 - 2010
                </div>

                <p>
                  Working in web design agencies and startups as a full stack developer.
                </p>
              </li>
            </ul>
          </div>

          </div>
        );
    }
}
