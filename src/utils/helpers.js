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

export const getCountryCode = (data, country) => {
  try {
    const cData = data.get(country);
    for (let x of Object.keys(cData)) {
      return cData[x].country_code;
    }
  } catch (e) {
    return 0;
  }
};

export const getValue = (data, country, rawDate, filter) => {
  //TODO: feb 14 japan is black?
  if (country === "World") {
    let total = 0;
    for (let [key, value] of data) {
      total += value[rawDate]
        ? Number(value[rawDate][filter])
        : 0;
    }
    return total < 0 ? 0 : total;
  } else {
    try {
      const cData = data.get(country);
      const dateData = cData[rawDate];
      return dateData
        ? isNaN(Number(dateData[filter]))
          ? dateData[filter]
          : Number(dateData[filter])
        : 0;
    } catch (e) {
      return 0;
    }
  }
};
