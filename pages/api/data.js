import { selectDataByDay, selectDataByMonth } from "../../src/database";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { sort, start, end } = req.query;
    let data;
    if (sort === "daily") {
      data = await selectDataByDay(start, end);
    } else if (sort === "monthly") {
      data = await selectDataByMonth("2020-10-22", "2020-10-30");
    } else {
      data = null;
    }
    res.status(200).json({
      results: data,
    });
  } else {
    res.status(403).json({ error: "error" });
  }
};
export default handler;
