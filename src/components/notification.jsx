import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification } from "../store/actions/notification_action";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";


const Notifications = () => {
  const notifications = useSelector(state => state.notification.notifications);
  const dispatch = useDispatch();

  const removeNotification = (notification) => {
    dispatch(deleteNotification(notification));
  }

  const renderAllNotificacions = () => {   
    return notifications.map(item => 
      AlertNotificacion(item, removeNotification)) 
  }

  return (
    notifications.length > 0 ?      
      renderAllNotificacions()     
      : null
  );
};
export default Notifications;



const AlertNotificacion = (notification, deleteNotification) => {
  return <Snackbar open={true} autoHideDuration={notification.Timeout ? notification.Timeout-300 : null} onClose={()=>deleteNotification(notification)}>
    <Alert onClose={()=>deleteNotification(notification)} severity={notification.Severity}>
      {notification.Description}
    </Alert>
  </Snackbar> 
}

