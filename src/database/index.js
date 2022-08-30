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

export const selectDataByDay = (start, end) => {
  return new Promise((resolve, reject) => {
    client.query(
      "select to_char(date, 'YYYY-MM-DD') as fDate, * from covid_cases where date between $1 and $2",
      [start, end],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res.rows);
      }
    );
  });
};
export const selectDataByMonth = (start, end) => {
  return new Promise((resolve, reject) => {
    client.query(
      "select * from covid_cases where date between $1 and $2",
      [start, end],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res.rows);
      }
    );
  });
};
