import React from 'react'; 
import { BASE_URL } from '../config.js'; 
import {Table, Container} from 'react-bootstrap'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom';

// USE report list 
// load individual report 
// report individual 


class Reports extends React.Component {
    state = {
        reports: [], 
        report_list: []
    }
    
    componentDidMount() {
        axios.get(`${BASE_URL}/vehicleList`)
        .then(res => {
            let report_list = res.data.vehicles
                                .map((val) => val.fileName); 

            report_list = Array.from(new Set(report_list));
            
            this.setState({
                reports : res.data.vehicles, 
                report_list: report_list
            });
            console.log(this.state); 
        })
    }

    createTable = (r_list) => {
        let rows = []; 
        
        for(let i in r_list){
            let filterObj = this.state.reports.filter((v) => v.fileName === r_list[i]); 
            rows.push(
                <tr>
                    <td>{parseInt(i)+1}</td>
                    <td>
                        <Link 
                            to={{pathname: `/report/${r_list[i].split('-')[0]}`, state: filterObj}}
                        >
                            {r_list[i]}
                         </Link>
                    </td>
                    <td><a href={`${BASE_URL}/files/${r_list[i]}`} target="_blank">View XML File</a></td>
                </tr>
            ); 
        }
        return rows
    }   

    render() {
        return (
            <Container>
            <h1>Reports</h1>
            <p>This page consist of all the reports uploaded.</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ReportFileName</th>
                        <th>View XML File</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createTable(this.state.report_list)}
                </tbody>
            </Table>
        </Container>
        ); 
    }
}


export default Reports;  
