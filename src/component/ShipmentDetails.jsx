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
              <a><i className="fa fa-bell" aria-hidden="true"></i><div style={{ position: 'relative', top: '-30px', left: '30px', background: 'red', width: '20px', height: '20px', borderRadius: '10px' }}>2</div></a>
            </div>
            <hr />
            <div>
                <div onClick={this.onsignout} data-tip="Log Out"><i className="fas fa-sign-out-alt" style={pathname === '/view-shipment' ? { color: 'blue' } : { color: 'grey'}}></i></div>
            </div>
          </div>
          <div className="m-content leave-sticky center">
            <div className="container">
              <div className="page-header ana-space-top">
                <h2><strong>Shipment Detail & Timeline</strong></h2>
              </div>
              <ul className="timeline">
                  <li className="">
                    <div className="timeline-badge success"><i className="glyphicon glyphicon-check"></i></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4 className="timeline-title">Performance Invoice (PFI)</h4>
                        <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                        <Link to='/update' className="update clickable">Update</Link>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-badge danger"><i className="glyphicon glyphicon-credit-card"></i></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4 className="timeline-title">Form M</h4>
                        <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                      </div>
                      <div className="timeline-body">
                        <p> <input type='checkbox' /> Letter of Credit</p>
                        <p> <input type='checkbox' /> Insurance</p>
                        <p onClick={this.openModal} className="update clickable">Update</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge danger"><i className="glyphicon glyphicon-credit-card"></i></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4 className="timeline-title">Required Permits</h4>
                      </div>
                      <div className="timeline-body">
                      <button type="button" class="btn btn-primary update clickable" data-toggle="modal" data-target="#addpermit">
                        Add Permit
                      </button>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-badge danger"><i className="glyphicon glyphicon-floppy-disk"></i></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4 className="timeline-title">Draft Bill of Lading</h4>
                        <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                      </div>
                      <div className="timeline-body">
                        <p>- Estimated Date of Departure</p>
                        <p>- Estimated Date of Arrival</p>
                        <button type="button" class="btn btn-primary update clickable" data-toggle="modal" data-target="#addestimate">
                        update
                        </button>
                        
                      </div>
                    </div>
                  </li>
                  <li className="timeline">
                    <div className="timeline-badge danger"><i className="glyphicon glyphicon-thumbs-up"></i></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4 className="timeline-title">Container Arrival</h4>
                        <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i><strong>Date:</strong>  01-05-2018</small></p>
                      </div>
                      <div className="timeline-body">
                        <p>- Expected time this current shipment should be at the port. All the necessary documents should be ready by now.</p>
                      </div>
                    </div>
                  </li>
              </ul>
          </div>
          </div>
          <div class="modal fade" id="addpermit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Permit</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="file" name="myFile" className="input-file"/>
              <input type="file" name="myFile" className="input-file"/>
              <input type="file" name="myFile" className="input-file"/>
              <input type="file" name="myFile" className="input-file"/>
              <input type="file" name="myFile" className="input-file"/>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="addestimate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Permit</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Estimated Date of Departure:&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" className="input-date"/><br/>
              <br/>
              Estimated Date of Arrival: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" name="myFile" className="input-date"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">update</button>
            </div>
          </div>
        </div>
      </div>
          </div>
        );
    }
}
