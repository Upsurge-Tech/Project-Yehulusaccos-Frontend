import dateFormat from "dateformat";

const formateDate = (date: string | Date) => dateFormat(date, "longDate");

export default formateDate;
