import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

export const selectDataByDay = (start, end, orderBy) => {
  return new Promise((resolve, reject) => {
    let query = "";
    if (orderBy === "desc") {
      query =
        "select to_char(date, 'YYYY-MM-DD') as fDate, * from covid_cases where date between $1 and $2 order by date desc";
    } else {
      query =
        "select to_char(date, 'YYYY-MM-DD') as fDate, * from covid_cases where date between $1 and $2";
    }
    client.query(query, [start, end], (err, res) => {
      if (err) return reject(err);
      return resolve(res.rows);
    });
  });
};
export const selectDataByMonth = (start, end, orderBy) => {
  return new Promise((resolve, reject) => {
    let query = "";
    if (orderBy === "desc") {
      query =
        "select to_char(date_trunc('month', date), 'YYYY-MM') fdate, country, country_code, max(total_cases) as total_cases, max(total_vaccinations) total_vaccinations, max(total_boosters) total_boosters, max(total_deaths) total_deaths, sum(daily_cases) daily_cases, sum(daily_vaccinations) daily_vaccinations, sum(daily_deaths) daily_deaths from covid_cases where date between $1 and $2 group by date_trunc('month', date), country, country_code order by date_trunc('month', date) asc;";
    } else {
      query =
        "select to_char(date_trunc('month', date), 'YYYY-MM') fdate, country, country_code, max(total_cases) as total_cases, max(total_vaccinations) total_vaccinations, max(total_boosters) total_boosters, max(total_deaths) total_deaths, sum(daily_cases) daily_cases, sum(daily_vaccinations) daily_vaccinations, sum(daily_deaths) daily_deaths from covid_cases where date between $1 and $2 group by date_trunc('month', date), country, country_code order by date_trunc('month', date) asc;";
    }

    client.query(query, [start, end], (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.rows);
    });
  });
};
