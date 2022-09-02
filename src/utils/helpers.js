import moment from "moment";
export const getUniqueDates = (data) => {
  return [...new Set(data.map((c) => c.fdate))];
};

export const sleep = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000);
  });
};

export const getNextDate = (sortBy, orderBy, data) => {
  if (sortBy === "daily" && orderBy === "asc")
    return moment(data[data.length - 1].fdate)
      .add(1, "d")
      .format("YYYY-MM-DD");
  if (sortBy === "daily" && orderBy === "desc")
    return moment(data[data.length - 1].fdate)
      .subtract(1, "d")
      .format("YYYY-MM-DD");
  if (sortBy === "monthly" && orderBy === "asc")
    return moment(data[data.length - 1].fdate)
      .add(1, "M")
      .format("YYYY-MM-DD");
  if (sortBy === "monthly" && orderBy === "desc") {
    let date = data[data.length - 1].fdate;
    date = moment(date).subtract(1, "year");
    date = moment(date).startOf("month").format("YYYY-MM-DD");
    return date;
  }
};

export const getDates = (sortBy, orderBy, nextDate) => {
  if (sortBy === "daily") {
    if (orderBy === "asc") {
      return {
        start: nextDate,
        end: moment(nextDate).add(29, "d").format("YYYY-MM-DD"),
      };
    } else {
      //desc
      return {
        start:
          nextDate !== ""
            ? moment(nextDate).subtract(29, "d").format("YYYY-MM-DD")
            : "2022-07-09",
        end: nextDate !== "" ? nextDate : "2022-08-07",
      };
    }
  } else {
    //monthly
    if (orderBy === "asc") {
      return {
        start: nextDate !== "" ? nextDate : "2020-01-01",
        end:
          nextDate !== ""
            ? moment(nextDate).endOf("year").format("YYYY-MM-DD")
            : "2020-12-31",
      };
    } else {
      //desc
      return {
        start: nextDate !== "" ? nextDate : "2022-01-01",
        end:
          nextDate !== ""
            ? moment(nextDate).endOf("year").format("YYYY-MM-DD")
            : "2022-12-31",
      };
    }
  }
};

export const getHexColor = (value) => {
  if (value === 0) return "#f3f3f3";
  if (value > 0 && value.toString().length <= 2) return "#ffedea";
  if (value.toString().length === 3) return "#ffcec5";
  if (value.toString().length === 4) return "#ffad9f";
  if (value.toString().length === 5) return "#FFAAAA";
  if (value.toString().length === 6) return "#ff8a75";
  if (value.toString().length === 7) return "#ff5533";
  if (value.toString().length === 8) return "#e2492d";
  if (value.toString().length === 9) return "#be3d26";
  if (value.toString().length === 10) return "#9a311f";
  if (value.toString().length === 11) return "#782618";
  if (value.toString().length >= 12) return "#57180e";
};

export const getCountryCode = (data, country) => {
  try {
    const code = data[country];
    for (let c of Object.keys(code)) {
      return code[c].country_code;
    }
  } catch (e) {
    return 0;
  }
};

export const getValue = (data, country, currDate, filter) => {
  if (country === "World") {
    let total = 0;
    for (let key of Object.keys(data)) {
      total += data[key][currDate] ? Number(data[key][currDate][filter]) : 0;
    }
    return total < 0 ? 0 : total;
  } else {
    try {
      const cData = data[country];
      const dateData = cData[currDate];
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
