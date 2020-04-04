import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({brand:'', model:'', color:'', fuel:'', year: 0, price: 0})

    const handleClickOpen = () => {
        setCar({brand:props.car.brand, 
                year:props.car.year,
                model:props.car.model,
                price: props.car.price,
                color: props.car.color,
                fuel: props.car.fuel})
        setOpen(true);
    };

    const handleClose = () => {
        props.updateCar(props.car._links.self.href, car);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const inputChanged = (event) =>{
        setCar({...car, [event.target.name]: event.target.value});
    } 

    return (
        <div>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit the car</DialogTitle>
                <DialogContent>                   
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        label="brand"
                        type="text"
                        onChange={inputChanged} 
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        label="Model"
                        type="text"
                        onChange={inputChanged}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        label="Color"
                        type="text"
                        onChange={inputChanged}
                        required                        
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        label="Fuel"
                        type="text"
                        onChange={inputChanged}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        label="Year"
                        type="number"
                        onChange={inputChanged}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        label="Price"
                        type="number"
                        onChange={inputChanged}
                        required
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}