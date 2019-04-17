import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { BASE_URL } from '../config.js'; 
import axios from 'axios'; 
import { LinkContainer } from 'react-router-bootstrap';


export default class Dashboard extends React.Component {   
    state = {
        selectedFile: null, 
        vehicles: [],
        btn_visibility: false 
    }

    // componentDidMount() {
    //     axios.get(`${BASE_URL}/test`)
    //     .then(res => {
    //         console.log(res.data); 
    //     })
    // }

    handleFileSelect = (event) => {
        const selectFile = event.target.files[0]; 
        if(selectFile.name.endsWith('.xml')){
            this.state.selectedFile = selectFile; 
        }else{
            alert('upload correct file'); 
        }

    }; 

    handleFileUpload = () => {
        console.log(this.state.selectedFile);

        let formData = new FormData(); 

        formData.append("xml", this.state.selectedFile,  this.state.selectedFile.name);

        axios.post(`${BASE_URL}/upload`, formData)
        .then(res => {
            this.setState({
                vehicles: res.data.report_data,
                btn_visibility: true
            }); 

            console.log(this.state); 
        }); 
    }; 

    render(){
        return (
            <Container>
            <div>
                <h1>Upload File </h1>
                <p>Kindly upload a file here to generate report</p>
                <input type="file" id="fileupload" onChange={this.handleFileSelect}/>
                <Button variant="primary" onClick={this.handleFileUpload}>Upload File</Button>
            </div>
            
            {this.state.btn_visibility && 
                <LinkContainer 
                to={{pathname: `/report/${this.state.vehicles[0]['timestamp']}`, state: this.state.vehicles}}>
                    <Button variant="success">
                        View Report 
                    </Button>
                </LinkContainer>
            }
            </Container>
        ); 
    }
}



