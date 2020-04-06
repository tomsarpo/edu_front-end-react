import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'react-table-v6/lib/propTypes';

export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname:'', streetaddress:'', postcode:'', city:'', email:'', phone:'' 
    })

    const handleClickOpen = () => {
      console.log(props.customer);
      setCustomer({ 
          firstname: props.customer.firstname,
          lastname: props.customer.lastname,
          streetaddress: props.customer.streetaddress,
          postcode: props.customer.postcode,
          city: props.customer.city,
          email: props.customer.email,
          phone: props.customer.phone
        }
      )
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const update_Customer = () => {
        props.updateCustomerProp(customer, props.customer.links[0].href); //pass to CustomerList
        handleClose();
    }

    return(
      <>
        <div>
        <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
            Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    label="firstname"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    label="lastname"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    label="streetaddress"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="city"
                    value={customer.city}
                    label="city"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    label="postcode"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="email"
                    value={customer.email}
                    label="email"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    label="phone"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} streetaddress="primary">
                    Cancel
                </Button>
                <Button onClick={update_Customer} streetaddress="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
        </div>
      </>
    )
}