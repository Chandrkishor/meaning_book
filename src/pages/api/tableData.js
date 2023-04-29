// eslint-disable-next-line import/no-unresolved
import redis from "@/lib/redis";

//** GET /your-api-endpoint?cursor=2&count=10
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const cursor = req.query.cursor || "0";
      const count = parseInt(req.query.count) || 10;
      const data = {};
      let nextCursor = cursor;
      let keys = [];

      // Scan for keys
      do {
        const result = await redis.scan(
          nextCursor,
          "MATCH",
          "*",
          "COUNT",
          count
        );
        nextCursor = result[0];
        keys = result[1];

        // Retrieve values for keys
        const values = await redis.mget(...keys);
        keys.forEach((key, index) => {
          data[key] = values[index];
        });
      } while (nextCursor !== "0" && Object.keys(data).length < count);

      // Create response
      const response = {
        data,
        nextCursor: nextCursor === "0" ? null : nextCursor,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error(`Failed to retrieve data from Redis: ${error}`);
      throw error;
    }
  }
}
