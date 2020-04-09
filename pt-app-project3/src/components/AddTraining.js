import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import 'moment/locale/fi';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration:'', activity:'', customer:''
    })
    const [customerLink, setCustomerLink] = React.useState('');
    const [dateStr, setDateStr] = React.useState('');
    const classes = useStyles();

    const handleClickOpen = () => {
        var idVal = '';
        var baseURL = 'https://localhost:8080/api/customers/'

        var dateVal = moment.now(); //'2020-04-07T23:30:00.000+0000';
        console.log(dateVal);
        setDateStr( 
            moment(dateVal).subtract(9, 'h').subtract(30, 'm').format('DD.MM.YYYY') + ' ' 
            + moment(dateVal).subtract(9, 'h').subtract(30, 'm').format('HH:mm a')
        );
        console.log(dateStr);

        console.log("AddTraining props.customer");
        console.log(props.customer);
        idVal = props.customer.links[0].href;
        console.log(idVal);
        idVal = idVal.substring(idVal.lastIndexOf('/') + 1);
        idVal = baseURL + idVal;
        console.log(idVal);
        setCustomerLink(idVal);
        setTraining({...training, ['customer']: idVal, ['date']: dateVal});
        setOpen(true);
        console.log(training); //has not been updated yet
    };
  
    const setDateToTraining = (date) => {
        console.log("setDateToTraining");
        console.log(date);
        let date_local = moment(date).local().utc();
        console.log(date);
        //setTraining({...training, ['date']: date_local});

        //TODO: study ref use https://nozzlegear.com/blog/datepickerdialog-how-to-open-material-ui-s-datepicker-with-a-button-or-any-other-element
    }

    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    const add_Training = () => {
        //setTraining({...training, ['customer']: customerLink.value});
        console.log("add_Training");
        console.log(training);
        props.addCustomerTrainingProp(training); //pass to CustomerList
        handleClose();
    };

    return(
      <>
        <div>
        <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New training</DialogTitle>
            <DialogContent>
                
                <TextField
                    id="datetime-local"
                    label="appointment date"
                    type="datetime-local"
                    defaultValue="2020-04-10T10:30"
                    className={classes.textField}
                    onAccept={date => setDateToTraining(date)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                
                <TextField
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    label="duration"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    label="activity"
                    onChange={e => handleInputChange(e)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="customer"
                    value={customerLink}
                    label="customer (read only)"
                    type="text"
                    fullWidth
                    readOnly="True"
                />
                
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={add_Training} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
      </>
    )
}