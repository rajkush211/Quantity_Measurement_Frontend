import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            quantityType: '',
            quantityList: [],
            quantityUnitsList: [],
            unitType: '',
            OutputUnitType: '',
            path: '',
            outputValue: [],
            values: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8081/quantity')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    quantityList: json
                })
            })
        fetch('http://localhost:8081/quantity/LENGTH')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    quantityUnitsList: json,
                    quantityType: 'LENGTH'
                })
            })
    }

    handleChange = (event) => {
        fetch(`http://localhost:8081/quantity/${event.target.value}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    quantityUnitsList: json
                })
            })

    }

    handleChangeInputUnit = (event) => {
        this.setState({
                unitType: event.target.value
        })
    } 

    handleChangeOutputUnit = (event) => {
        this.setState({
                OutputUnitType: event.target.value
        })
    } 


    handleChangeinput = async(event) => {
        const val = event.target.value
        await this.setState({
            values: val
        })
        fetch("http://localhost:8081/quantity/conversion/" + this.state.OutputUnitType, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({"value": this.state.values, "quantityUnits": this.state.unitType})
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                    this.setState({
                        outputValue: json
                    })
                })   
    }

    render() {
        const {quantityList, quantityUnitsList, outputValue} = this.state;
        return (
            <div className='mainDiv'>
                <div className="App">
                    <div className='Select'>
                    <select  style={{ marginLeft: '18px',  marginRight: '18px', height: '40px', width: '93%'}}onChange={this.handleChange}>
                        {quantityList.map(element => <option>{element}</option>)}
                    </select>
                    </div>
                    <div className="selectDiv">
                        <div className='box'>
                            <input type="text" style={{ marginLeft:'267px'}} onChangeCapture={this.handleChangeinput}></input>
                            <h4 style={{ marginTop:'-1px',  marginLeft:'6px',marginRight:'6px'}}> = </h4>
                            <input value={JSON.stringify(outputValue)} type="text" style={{ marginLeft:'-2px'}}></input>
                        </div>
                    </div>
                  
                    <div className='box1'>
                        <select style={{ width:'190px'}} onChange={this.handleChangeInputUnit}>{quantityUnitsList.map(units => <option>{units}</option>)}</select>
                        <select style={{ marginLeft:'10px',width:'190px'}} onChange={this.handleChangeOutputUnit}>{quantityUnitsList.map(units => <option>{units}</option>)}</select>
                    </div>
                    <h3 style={{ marginLeft:'237px'}}>{this.state.quantityType}</h3>
                </div></div>
        );
    }
}

export default App;
