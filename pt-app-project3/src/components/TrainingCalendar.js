import React, { useState, useEffect, useRef} from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import 'moment/locale/fi';
import "react-big-calendar/lib/css/react-big-calendar.css";

import Event from './CustomEvent'

moment.locale("fi");
const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
    const [trainings, setTrainings] = useState([]);
    const [calEvents, setCalEvents] = useState([]);

    useEffect(() => fetchData(), []);

    useEffect(() => convertTrainingsToEvents(), [trainings]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            return response.json();
          })
        .then(responseData => {
            console.log("trainings - responseData");
            console.log(responseData);
            setTrainings(responseData); //store trainings as raw object
            console.log("fetchData - trainings");
            console.log(trainings);
        })
        /*.then( (responseData) => {
            console.log('fetchData done');
            convertTrainingsToEvents(responseData);
        })*/

    }

    const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
            style: {
            backgroundColor: 'lightblue',
        },
    })

    const convertDate = (date) => {
        return moment.utc(date).toDate()
    }

    const convertTrainingsToEvents = () => {
        /*
        Event {
            title: string,
            start: Date,
            end: Date,
            allDay?: boolean
            resource?: any,
            tooltip: string
        }
        */
        console.log('convertTrainingsToEvents: trainings');
        console.log(trainings.length);

        if (trainings && trainings.length) { //check that trainings is loaded from API
            /*
            let appointments = [
                {title: '', start:'', end:'', allDay:'', tooltip:''}
            ];
            console.log('convertTrainingsToEvents: trainings');
            console.log(trainings);
            
            for (let i = 0; i < trainings.length; i++) {
                console.log(trainings[i].activity, convertDate(trainings[i].date));
                appointments[i].title = trainings[i].activity;
                appointments[i].start = convertDate(trainings[i].date); 
                appointments[i].end =  convertDate(moment(trainings[i].date).add(trainings[i].duration, 'm'));
                appointments[i].allDay = false;
                appointments[i].tooltip = trainings[i].activity +" /  "+ trainings[i].customer.firstname  +" "+ trainings[i].customer.lastname;
            }*/
            
            let appointments = trainings.map(training => ({
                title : training.activity + " " + training.duration + " / " + training.customer.lastname,
                start : convertDate(training.date),
                end :  convertDate(moment(training.date).add(training.duration, 'm')),
                allDay : false,
                description : training.activity +" " + training.duration + "min",
                customer : training.customer.firstname  +" "+ training.customer.lastname
            }));
 
            setCalEvents(appointments);  //calEvents:appointments[]
                      
            console.log('convertTrainingsToEvents: appointments');
            console.log(appointments);
        }
    }
    
    
    return (
    <div style={{ height: 700 }}>
        <Calendar
            events={calEvents}
            localizer={localizer}
            step={60}
            startAccessor="start"
            endAccessor="end"
            tooltipAccessor="false"
            showMultiDayTimes
            views={['month','week','day']}
            defaultDate={new Date(2020, 3, 1)}
            components={{
                timeSlotWrapper: ColoredDateCellWrapper,
                event: Event
            }}
        />
      

      
    </div>
  )
  
}