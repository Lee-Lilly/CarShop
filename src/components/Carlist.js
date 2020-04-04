import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './AddCar';
import Editcar from './EditCar';

export default function Carlist(){
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('blabla');

    useEffect(() => {
        getCars();
    }, [])

    const getCars = () =>{
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const addCar =(car) =>{
        console.log(car);
        if (car.brand !== ''||car.model !== ''|| car.color!==''||car.fuel !==''){
            fetch('https://carstockrest.herokuapp.com/cars', 
                {   
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(car)
                })
                .then(_ => getCars())
                .then(_ =>{
                    setMsg("New Car is added");
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
        else{
            alert("Can not add item with empty fields");
        }
    }    

    const updateCar = (link, car) =>{
        fetch(link,
            {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(car)
            })
            .then(_ => getCars())
            .then(_ => {
                setMsg("Car is updated");
                setOpen(true);
                }
        ).catch(err => console.error(err))
    }

    const deleteCar =(link) =>{
        if (window.confirm("Are you sure?"))
        {
            fetch(link, { method: 'Delete' })
                .then(_ =>setMsg("Car is removed."))
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
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            filterable: false,
            sortable: false,
            Cell: row => (<Editcar updateCar={updateCar} car={row.original} />)
        },
        {   
            filterable: false,
            sortable: false,
            accessor: '_links.self.href', //access point in the json file
            Cell: row =>(<Button color='secondary'onClick={() => deleteCar(row.value)}>Delete</Button>)
        }
    ]

    return (
        <div>
            <Addcar addCar={addCar} />
            <ReactTable filterable={true} defaultPageSize={10} data={cars} columns={columns}></ReactTable>
            <Snackbar open={open} autoHideDuration={6000} onClose={handelClose} message={msg}></Snackbar>
        </div>
    )
}