import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

export default class ShipmentList extends Component {

    state = {
        shipmentlist: [{
            id:'6575447585',
            pfNumber: 'HJ45',
            name: 'cloth',
            shipmentDate: 'Incomplete'

        },
        {
            id:'657574585',
            pfNumber: 'HJ45',
            name: 'Toothpaste',
            shipmentDate: 'Completed'

        },
        {
            id:'65757567hh',
            pfNumber: 'HJ45',
            name: 'mass',
            shipmentDate: 'Incomplete'

        },
        {
            id:'65757567',
            pfNumber: 'HJ45',
            name: 'macppppppss',
            shipmentDate: 'Completed'

        },{
            id:'6575as756hh7',
            No: 'HJ45',
            name: 'macphhhhpppppss',
            shipmentDate: 'Completed'
        },
        {
            id:'65f757567hh',
            pfNumber: 'HJ45',
            name: 'mass',
            shipmentDate: 'Incomplete'

        },
        {
            id:'65asx757567',
            pfNumber: 'HJ45',
            name: 'macppppppss',
            shipmentDate: 'Completed'

        },{
            id:'6575mq7bb56hh7',
            pfNumber: 'HJ45',
            name: 'macphhhhpppppss',
            shipmentDate: 'Completed'
        },
        {
            id:'65757asp567hh',
            pfNumber: 'HJ45',
            name: 'mass',
            shipmentDate: 'Incomplete'

        },
        {
            id:'6dd5757567',
            pfNumber: 'HJ45',
            name: 'macppppppss',
            shipmentDate: 'Completed'

        },{
            id:'657576656hh7',
            pfNumber: 'HJ45',
            name: 'macphhhhpppppss',
            shipmentDate: 'Completed'
        }
    ]
    }
    render() {
        const { pathname } = this.props.location;
        const displayShipments = this.state.shipmentlist.map((shipment, index) => {
            return (
                <div key={shipment.id} className="col-sm shipmentCard">
                    <div>
                        <p><strong>PF Number:</strong> {shipment.pfNumber}</p>
                        <p><strong>Supplier Name:</strong> {shipment.name}</p>
                        <p><strong>Shipment Date:</strong> {shipment.shipmentDate}</p>
                    </div>
                    <div>
                        <Link to={`/shipments/${shipment.id}`}><button className="btn btn-outline-primary shipmentCardbtn">Get Details</button></Link>
                    </div>
                </div>
            );
        });

        return (
            <div className="dasboard__container">
                <ReactTooltip />
                <div className="side__nav">
                    <Link to="/">
                        <img height="50px" width="50px" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/1200px-Unilever.svg.png" />
                    </Link>
                    <hr />
                    <div>
                        <Link to="/dashboard" data-tip="Add Shipment"><i className="far fa-plus-square" style={pathname === '/dashboard' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
                    </div>
                    <hr />
                    <div>
                        <Link to="/shipments" data-tip="View All Shipments"><i className="fas fa-shipping-fast" style={pathname === '/shipments' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
                    </div>
                    <hr />
                    <div>
                        <Link to="/analytics" data-tip="Analytics"><i className="fas fa-chart-line" style={pathname === '/analytics' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
                    </div>
                    <hr />
                    <div>
                        <a><i className="fa fa-bell" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div>
                    <div className="my-search-container">
                        <div className="my-form-wrapper form-group">
                            <div>
                                <input id="search-input" type="text" placeholder="Search here..." required />
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>
                            <div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">PFI Number</label>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Supplier Name</label>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Shipment Date</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shipment-list">
                        {displayShipments}
                    </div>
                </div>
                <div />
            </div>
        );
    }
}