import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function Carlist(){
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [delCar, setDelCar] = useState({brand: '', model: '', color:''});
    const [del_msg, setDelMsg] = useState('blabla');

    useEffect(() => {
        getCars();
    }, [])

    const getCars = () =>{
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar =(link) =>{
        fetch(link)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log(data.brand);                
                //console.log(data.model); 
                //console.log(data.color);
                setDelCar({brand: data.brand, model: data.model, color: data.color});

            });
        if (window.confirm("Are you sure?")){
            fetch(link, { method: 'Delete' })
                .then(_ =>setDelMsg("Car: " + delCar.brand +" "+ delCar.model + " " + delCar.color + " is removed"))
                .then(response => getCars()) //refresh the table
                .then(_ => setOpen(true)) //message sent after deletion
                .catch(err => console.error(err))
        }
    }

    const handelClose =() =>{
        setOpen(false);
    } 

    const columns =[
        {
            Header: 'Brand',
            accessor:'brand'
        },
        {
            Header: 'Model',
            accessor:'model'
        },
        {
            Header: 'Color',
            accessor:'color'
        },
        {
            Header: 'Year',
            accessor:'year'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            accessor: '_links.self.href', //access point in the json file
            Cell: row =>(<Button color='secondary'onClick={() => deleteCar(row.value)}>Delete</Button>)
        }
    ]

    return (
        <div>
            <ReactTable filterable={true} defaultPageSize={10} data={cars} columns={columns}></ReactTable>
            <Snackbar open={open} autoHideDuration={40000} onClose={handelClose} message={del_msg}></Snackbar>
            </div>
    )
}