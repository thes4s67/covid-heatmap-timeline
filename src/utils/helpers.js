import moment from "moment";
//TODO: probably update w/ order by var
export const getUniqueDates = (data) => {
  return [...new Set(data.map((c) => c.date))];
};

export const formatDate = (date) => {
  return moment(date).format("MMM DD YYYY");
};

export const getHexColor = (value, country) => {
  if (value === 0) return "#f3f3f3";
  if (value > 0 && value < 10) return "#ffedea";
  if (value > 10 && value < 20) return "#ffcec5";
  if (value > 20 && value < 30) return "#ffad9f";
  if (value > 30 && value < 40) return "#ff8a75";
  if (value > 50 && value < 60) return "#ff5533";
  if (value > 60 && value < 70) return "#e2492d";
  if (value > 70 && value < 80) return "#be3d26";
  if (value > 80 && value < 90) return "#9a311f";
  if (value > 90) return "#782618";
};

export const getValue = (data, country, rawDate) => {
  // console.log(data, country, rawDate, "this is 2nd hit");
  //TODO: refactor this because this is SLOW! try to get O(1)
  //TODO: feb 14 japan is black?
  const t = data.filter((c) => c.country === country && c.date === rawDate);
  return t.length === 0 || !t ? 0 : Number(t[0].total_cases);
};