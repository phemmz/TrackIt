import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ReactTooltip from 'react-tooltip';
import Loader from 'react-loader';

import { getAllShipments } from '../Helpers/handleApiRequest';

class ShipmentList extends Component {

    state = {
        shipmentLists: [],
        loaded: false,
        errors: {}
    }

    async componentDidMount() {
        this.setState({ loaded: true });
        const response = await getAllShipments();

        if (response.status === 'success') {
            this.setState({
                shipmentLists: response.data,
                loaded: false,
            });
        } else {
            this.setState({
                errors: 'Couldnt load all shipments, Please try again',
                loaded: false,
            });
        }
    }

    navigateToShipmentId = (shipmentId) => {
        this.context.router.history.push(`/shipments/${shipmentId}`);
    }

    render() {
        const { pathname } = this.props.location;
        const { shipmentLists } = this.state;

        const displayShipments = shipmentLists.map((shipment, index) => {
            return (
                <tr key={shipment.id} className="shipmentRow" onClick={() => this.navigateToShipmentId(shipment.id)}>
                    <td>{shipment.pfi.supplier_name}</td>
                    <td>{shipment.pfi.pfi_number}</td>
                    <td></td>
                </tr>
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
                {
                    this.state.loaded ?
                        <div className="circle">
                            <div className="circle1 child"></div>
                            <div className="circle2 child"></div>
                            <div className="circle3 child"></div>
                            <div className="circle4 child"></div>
                            <div className="circle5 child"></div>
                            <div className="circle6 child"></div>
                            <div className="circle7 child"></div>
                            <div className="circle8 child"></div>
                            <div className="circle9 child"></div>
                            <div className="circle10 child"></div>
                            <div className="circle11 child"></div>
                            <div className="circle12 child"></div>
                        </div> :
                        <div className="table__section">
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
                            <table className="table my__table">
                                <thead >
                                    <tr>
                                        <th scope="col">Supplier Name</th>
                                        <th scope="col">PF Number</th>
                                        <th scope="col">Shipment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayShipments}
                                </tbody>
                            </table>
                        </div>
                }
                    <div />
            </div>
        );
    }
}

ShipmentList.contextTypes = {
    router: PropTypes.object.isRequired
}

export default ShipmentList;
