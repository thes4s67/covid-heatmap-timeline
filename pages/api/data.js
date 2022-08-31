import { selectDataByDay, selectDataByMonth } from "../../src/database";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { sort, start, end, orderBy } = req.query;
    let data;
    if (sort === "daily") {
      data = await selectDataByDay(start, end, orderBy);
    } else if (sort === "monthly") {
      data = await selectDataByMonth(start, end, orderBy);
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
