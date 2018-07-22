import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

import decodeToken from '../helper/decodeToken';

export default class ShipmentDetails extends Component {
  constructor(props){
    super(props)

    this.onsignout = this.onsignout.bind(this)
  }

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

  onsignout(event) {
    event.preventDefault()
    localStorage.removeItem('auth_token');
    this.props.history.push('/')
  }

    render() {
      const { pathname } = this.props.location;
      return (
        <div className="shipment__container">
          <ReactTooltip />
          <div className="side__nav sticky">
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
            <hr />
            <div>
                <div onClick={this.onsignout} data-tip="Log Out"><i className="fas fa-sign-out-alt" style={pathname === '/view-shipment' ? { color: 'blue' } : { color: 'grey'}}></i></div>
            </div>
          </div>
          <div className="m-content leave-sticky center">
            <div class="container">
              <div class="page-header ana-space-top">
                <h2><strong>Shipment Detail & Timeline</strong></h2>
              </div>
              <ul class="timeline">
                  <li className="">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Performance Invoice (PFI)</h4>
                        <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                        <p className="update clickable">Update</p>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-credit-card"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Form M</h4>
                        <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                      </div>
                      <div class="timeline-body">
                        <p> <input type='checkbox' /> Letter of Credit</p>
                        <p> <input type='checkbox' /> Insurance</p>
                        <p onClick={this.openModal} className="update clickable">Update</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-credit-card"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Required Permits</h4>
                      </div>
                      <div class="timeline-body">
                        <p className="update clickable">Add permits</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-floppy-disk"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Draft Bill of Lading</h4>
                        <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                      </div>
                      <div class="timeline-body">
                        <p>- Estimated Date of Departure</p>
                        <p>- Estimated Date of Arrival</p>
                        <p className="update clickable">Update</p>
                        <hr />
                      </div>
                    </div>
                  </li>
                  <li class="timeline">
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-thumbs-up"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Container Arrival</h4>
                        <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                      </div>
                      <div class="timeline-body">
                        <p>- Expected time this current shipment should be at the port. All the necessary documents should be ready by now.</p>
                      </div>
                    </div>
                  </li>
              </ul>
          </div>
          </div>

          </div>
        );
    }
}
