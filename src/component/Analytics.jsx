import React from 'react';
import { Link } from 'react-router-dom'

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
        <div className="side__nav sticky">
          <Link to="/">
            <img height="50px" width="50px" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/1200px-Unilever.svg.png" />
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
            <a><i className="fa fa-bell" aria-hidden="true"></i></a>
          </div>
          <hr />
          <div>
            <div onClick={this.onsignout} data-tip="Log Out"><i className="fas fa-sign-out-alt" style={pathname === '/view-shipment' ? { color: 'blue' } : { color: 'grey'}}></i></div>
          </div>
        </div>

        <div className="container">
          <h4 className="ana-home"><strong>Hi There,</strong></h4>

          <div className="row">
            <div className="col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">$50,000</h5>
                  <p className="card-text">Total Demorage Cost Paid</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">$500,000</h5>
                  <p className="card-text">Total Demorage Cost Unpaid</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <div className="card-body">
                 <h5 className="card-title">$500,000</h5>
                  <p className="card-text">Total Demorage Cost Unpaid</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">$500,000</h5>
                  <p className="card-text">Total Demorage Cost Unpaid</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center ana-row">
            <div className="col-sm-6">
              <img src='https://www.jqueryscript.net/images/Simple-Canvas-Based-Line-Chart-Plugin-For-jQuery-Topup.jpg'alt="pie chart"/>
              <p className="center-text"><strong>Line Graph</strong></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
