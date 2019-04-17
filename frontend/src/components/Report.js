import React from 'react'; 
import { Container, Table } from 'react-bootstrap';

const createTable = (r_list) => {
    let rows = []; 
    
    for(let val of [...r_list]){
        let wheels = val.wheels
                        .map((key) => `${key.position}-${key.material}`) 
                        .join(' | '); 
        rows.push(
            <tr>
                <td>{val.vehicle_id}</td>
                <td>{val.vehicle_name}</td>
                <td>{val.frame_material}</td>
                <td>{val.powertrain}</td>
                <td>{wheels}</td>
                <td>{val.timestamp}</td>
            </tr>
        ); 
    }
    
    return rows;
}

const Report = (props) => {
   return(
    <Container>
    <h1>Report</h1>
    <p>This page shows the single view of the report.</p>

        <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>vehicle id</th>
                        <th>vehicle name</th>
                        <th>frame material</th>
                        <th>powertrain</th>
                        <th>wheels</th>
                        <th>timestamp</th>
                    </tr>
                </thead>
                <tbody>
                {createTable(props.location.state)}
                </tbody>
            </Table>
    </Container>
   ); 
}
export default Report; 