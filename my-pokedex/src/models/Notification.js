export const TYPE_NOTIFICACION = {
    ALERT: "ALERT",
    DIALOG: "DIALOG"
}

export const SEVERITY_NOTIFICACION = {
    DEFAULT: "default",
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error"
}

export default class Notification {
    constructor() {
        this.Description = "";
        this.Id = null;
        this.Title = "";
        this.Severity = "";
        this.Type = "";
        this.Timeout = null;
    }

    static fromObject = function ({
        Description,
        Id,
        Title,
        Severity,
        Type,
        Timeout }) {
        var newNotif = new Notification();
        newNotif.Description = Description ? Description : "";
        newNotif.Id = Id ? Id : "";
        newNotif.Title = Title ? Title : "";
        newNotif.Severity = Severity ? Severity : SEVERITY_NOTIFICACION.WARNING;
        newNotif.Type = Type ? Type : TYPE_NOTIFICACION.ALERT;
        newNotif.Timeout = Timeout ? Timeout : null;
        return newNotif;
    }

    static newAlert = function (Description) {
        var newNotif = new Notification();
        newNotif.Description = Description ? Description : "";
        newNotif.Severity = SEVERITY_NOTIFICACION.WARNING;
        newNotif.Type = TYPE_NOTIFICACION.ALERT;
        newNotif.Timeout = 4000;
        return newNotif;
    }

    static createNotification= function (object) {
        if (typeof (object) == "object") {
            if (object instanceof Notification)
                return object
            return new Notification.fromObject(object);
        }
        return new Notification.newAlert(object);
    }
}