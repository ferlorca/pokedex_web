import Notification ,{SEVERITY_NOTIFICACION} from "../../models/Notification";
import {addNotification} from "./notification_action";

export const handleError = (err, type) => {
  return dispatch => {
    console.error(err);
    let error = { code: "500", message: "" }
    if (err.isAxiosError) {
      error.code = "404";
      error.message = err.message + " || Method:" + err.config.method + " || URL: " + err.config.url
    }
    dispatch({
      type: type,
      payload: error
    });
    let notification = new Notification.fromObject({
      Description: error.message,
      Title:error.code,
      Severity:SEVERITY_NOTIFICACION.WARNING,
      Timeout:5000
    });
    dispatch(addNotification(notification))
  }

};