import React, { useRef, useState }  from 'react';
import { Tooltip, Overlay} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import ReactDOM from 'react-dom';
import moment from "moment";
import 'moment/locale/fi';
import { momentLocalizer } from 'react-big-calendar';


moment.locale("fi");
const localizer = momentLocalizer(moment);

const convertDate = (date) => {
    let datestr = "";
    datestr = moment(date).format('DD.MM.YYYY');
    datestr = datestr + " " + moment(date).format('HH:mm a');
    return datestr
}

const convertTime = (date) => {
    let datestr = "";
    datestr = moment(date).format('HH:mm a');
    return datestr
}

const TooltipContent = ({ onClose, event }) => {
    return (
      <React.Fragment>
        <div
            
            style={{
              backgroundColor: 'rgba(234, 246, 255, 0.95)',
              padding: '2px 10px',
              color: '#3174ad',
              borderRadius: 3,
            }}
          >
            <CloseIcon
            className="pull-right"
            onClick={onClose}
            />
            {console.log(event)}
            <div>Details: {event.event.description}</div>
            <div>Customer: {event.event.customer}<br /></div>
            <div>Start: {convertTime(event.event.start)}</div>
            <div>Start: {convertTime(event.event.end)}</div>
            <div> <br /></div>
        </div>
      </React.Fragment>
    );
};
  
export default function Event(event) {
    const [showTooltip, setShowTooltip] = useState(false);
  
    const closeTooltip = () => {
      setShowTooltip(false);
    };
  
    const openTooltip = () => {
      setShowTooltip(true);
    };
    const ref = useRef(null);
  
    const getTarget = () => {
      return ReactDOM.findDOMNode(ref.current);
    };
  
    return (
      <div ref={ref}>
        <span onMouseOver={openTooltip}>{event.title}</span>
        <Overlay
          rootClose
          target={getTarget}
          show={showTooltip}
          placement="top"
          onHide={closeTooltip}
        >
          <Tooltip id="test">
            <TooltipContent event={event} onClose={closeTooltip} />
          </Tooltip>
        </Overlay>
      </div>
    );
  }
  