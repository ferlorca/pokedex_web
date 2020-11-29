import Instance from "./axiosUrl";
const CURRENT_YEAR = (new Date()).getFullYear();
const UNIVERSAL_DATE = new Date("2019-01-01T08:00:00-00:00");
const DEFAULT_DATE = UNIVERSAL_DATE.getTime() + (UNIVERSAL_DATE.getTimezoneOffset() * 60 * 1000);

export default {
  CURRENT_YEAR,
  DEFAULT_DATE,
  AXIOS: Instance,
} 