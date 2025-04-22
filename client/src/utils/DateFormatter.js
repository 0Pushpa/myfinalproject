import moment from "moment";

export default function DateFormatter(date) {
  var today = moment();
  var yesterday = moment().subtract(1, "day");

  var engagementDate = date;

  if (moment(engagementDate).isSame(today, "day"))
    return moment(engagementDate).format("hh:mm A") + ", Today";
  else if (moment(engagementDate).isSame(yesterday, "day"))
    return moment(engagementDate).format("hh:mm A") + ", Yesterday";
  else return moment(engagementDate).format("MMM DD HH:MM A");
}
