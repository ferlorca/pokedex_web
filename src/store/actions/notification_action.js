import * as types from '../action_types';
import Notification from "../../models/Notification";

export const addNotification = (notification) => {
    return (dispatch, getState) => {
        let count = getState().notification.count;
        let body = Notification.createNotification(notification);
        body.Id = count;
        dispatch({
            type: types.NOTIFICATIONS_ADD,
            payload: body
        });
        if (body.Timeout)
            dispatch(setTimeOutForNotifications(body))
    }
};

const setTimeOutForNotifications = (notification) => {
    return dispatch => {
        setTimeout(() => dispatch(deleteNotification(notification))
            , notification.Timeout)
    }
}


export const deleteNotification = (notification) => {
    return {
        type: types.NOTIFICATIONS_DELETE,
        payload: notification.Id
    };
};

