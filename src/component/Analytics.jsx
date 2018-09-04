import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import line_graph from '../assert/line_graph.jpg'

export default class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.onsignout = this.onsignout.bind(this)
  }

  onsignout(event) {
    event.preventDefault()
    localStorage.removeItem('auth_token');
    this.props.history.push('/')
  }
  render() {
    const { pathname } = this.props.location;

    return (
      <div>
        <ReactTooltip />
        <div className="side__nav sticky">
          <Link to="/">
            <img height="50px" width="50px" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/1200px-Unilever.svg.png" alt="logo" />
          </Link>
          <hr />
          <div>
            <Link to="/dashboard" data-tip="Add Shipment"><i className="far fa-plus-square" style={pathname === '/dashboard' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
          </div>
          <hr />
          <div>
            <Link to="/analytics" data-tip="Analytics"><i className="fas fa-chart-line" style={pathname === '/analytics' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
          </div>
          <hr />
          <div>
            <Link to="/shipments" data-tip="View All Shipments"><i className="fas fa-shipping-fast" style={pathname === '/view-shipment' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
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

        <div className="container" style={{ marginRight: '13rem' }}>
          <h4 className="ana-home"><strong>Hi There,</strong></h4>

          <div className="row">
            <div className="col-sm-3">
              <div className="card" style={{ height: '8rem' }}>
                <div className="card-body">
                  <h5 className="card-title">$50,000</h5>
                  <p className="card-text">Total Demorage Cost Paid</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card" style={{ height: '8rem' }}>
                <div className="card-body">
                  <h5 className="card-title">100 Containers</h5>
                  <p className="card-text">Total Consignments Uncleared</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card" style={{ height: '8rem' }}>
                <div className="card-body">
                 <h5 className="card-title">3 Containers</h5>
                  <p className="card-text">Total Consignments On Transit <br /><Link to="/">View</Link></p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card" style={{ height: '8rem' }}>
                <div className="card-body">
                  <h5 className="card-title">10</h5>
                  <p className="card-text">Consignments with Incomplete Documentation <Link to="/">View</Link></p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center ana-row">
            <div className="col-sm-6">
              <img src={line_graph} alt="pie chart"/>
              <p className="center-text"><strong>Demurrage Charge Graph</strong></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
