import React,{Component} from 'react';
import { Link } from 'react-router-dom';

export class ShipmentList extends Component{
    render(){
        const shipmentlist =[{
            id:'6575447585',
            No: 'HJ45',
            Name: 'cloth',
            Status: 'Incomplete'

        },
        {
            id:'657574585',
            No: 'HJ45',
            Name: 'Toothpaste',
            Status: 'Completed'

        },
        {
            id:'65757567',
            No: 'HJ45',
            Name: 'mass',
            Status: 'Incomplete'

        },
        {
            id:'65757567',
            No: 'HJ45',
            Name: 'macppppppss',
            Status: 'Completed'

        },{
            id:'65757567',
            No: 'HJ45',
            Name: 'macphhhhpppppss',
            Status: 'Completed'
        }]
        const data = shipmentlist.map(shipment => {
           return(
            <div key={shipment.id} className="shipment-row">
                <p>{shipment.Name}</p>
                <p>{shipment.No}</p>
                <p>{shipment.Status}</p>
                <Link to={`/detail/${shipment.id}`}><button className="btn btn-success">Details</button></Link>
            </div>
           )  
        })
    return(
    <div>
        <div className=' display-card'>
            <div >
                {data}
            </div>
        </div>
    </div>
)
}
}