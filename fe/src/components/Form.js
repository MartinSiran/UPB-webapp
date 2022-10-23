import React from 'react'
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import { render } from 'react-dom';

class Form extends React.Component {


    // const [startDate, setStartDate] = useState('');

    // const [service, setService] = useState('');

    constructor() {
        super(); 

        this.displayData = [];

        this.state = {
            showdata : this.displayData,
            postVal : "",
            startDate : "", 
            service : "", 
        }

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeService  = this.handleChangeService.bind(this);
        this.createReservation = this.createReservation.bind(this)
    }

    handleChangeDate = event => {
        this.setState({
            startDate : event.target.value
        });

        console.log('value is:', event.target.value);
    };

    handleChangeService = event => {
        this.setState({
            service : event.target.value
        });

        console.log('value is:', event.target.value);
    };

    createReservation() {
        console.log(this.state.startDate, '  ', this.state.service);

        this.displayData.push(<div  id="display-data mt-3"><p>{this.state.startDate}  {this.state.service}</p></div>); 
        console.log(this.displayData);
        this.setState({
           showdata : this.displayData,
           postVal : ""
        });
    }

    render(){
        return (
            <>
                <h1 class="text-center">
                Create reservation 
                </h1>
                <div class="d-flex justify-content-center mt-5">
                    <div class="d-block">
                        <div class="d-flex justify-content-start">
                            <div class="flex">
                                {/* <label for="startDate">Date */}
                                <input id="startDate" class="form-control" type="date" onChange={this.handleChangeDate} value={this.state.startDate}/>
                                {/* </label> */}
                            </div>
                            <div class="d-flex justify-content-end mx-1">
                                <select class="form-select" aria-label="Default select example" onChange={this.handleChangeService}>
                                    <option selected>Choose service</option>
                                    <option value="Men's cut">Men's cut</option>
                                    <option value="Trim the beard">Trim the beard</option>
                                    <option value="Hair coloring">Hair coloring</option>
                                </select>
                            </div>
                            <div class="d-flex justify-content-center mx-3">
                                <Button onClick={this.createReservation} class="primary">Confirm</Button>
                            </div>
                        </div>
                        <div id="display-data-Container">
                            {this.displayData}
                        </div>
                    </div>
                </div>
            </>
          )
    }
  
}

export default Form;
