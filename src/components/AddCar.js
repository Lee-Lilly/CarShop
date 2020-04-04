import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({brand:'', model:'', color:'', fuel:'', year: 0, price: 0})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.addCar(car);
        setCar({
            brand: '', model: '', color: '', fuel: '', year: 0, price: 0
        })
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
            <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={handleClickOpen}>
                New Car
            </Button>
            <Dialog open={open} onClose={handleClose} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new car</DialogTitle>
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