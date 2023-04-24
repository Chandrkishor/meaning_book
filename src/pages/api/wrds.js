import redis from "@/lib/redis";

export default async function handler(req, res) {
  const keysArr = Object.keys(req.query);
  if (req.method === "GET") {
    try {
      let values = await redis.get(keysArr);
      res.status(200).json(values);
    } catch (error) {
      console.error(`Failed to retrieve value from Redis: ${error}`);
      throw error;
    }
  } else if (req.method === "POST") {
    try {
      const { word, meaning } = req.body;
      const value = await redis.set(word, meaning);
      res.status(200).json({ data: value, message: "Your word added" });
    } catch (error) {
      console.error(`Failed to save array to Redis: ${error}`);
      throw error;
    }
  } else if (req.method === "DELETE") {
    const value = await redis.set(req.body.word, req.body.meaning);
    console.log("handler ~ value: >>", value);
    res.status(200).json(value);
  }
}
