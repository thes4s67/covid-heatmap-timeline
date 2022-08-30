import moment from "moment";
//TODO: probably update w/ order by var
export const getUniqueDates = (data) => {
  return [...new Set(data.map((c) => c.fdate))];
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
