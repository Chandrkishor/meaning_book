import redis from "@/lib/redis";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const keysArr = Object.keys(req.query);
    try {
      let keyValuePairs = {};
      for (let i = 0; i < keysArr.length; i++) {
        let values = await redis.get(keysArr[i]);
        keyValuePairs = {
          ...keyValuePairs,
          word: keysArr[i],
          translatedText: values,
        };
        res.status(200).json(keyValuePairs);
      }
    } catch (error) {
      console.error(`Failed to retrieve value from Redis: ${error}`);
      throw error;
    }
  } else if (req.method === "POST") {
    try {
      for (const { word, meaning } of req.body) {
        const value = await redis.set(word, meaning);
        console.log("handler ~ value: >>", value);
      }
      res.status(200).json("success");
    } catch (error) {
      console.error(`Failed to save array to Redis: ${error}`);
      throw error;
    }
  } else if (req.method === "PUT") {
    const value = await redis.set(req.body.word, req.body.meaning);
    console.log("handler ~ value: >>", value);

    // const id = await createWordSchema(req.body);
    res.status(200).json(value);
  } else if (req.method === "DELETE") {
    const value = await redis.set(req.body.word, req.body.meaning);
    console.log("handler ~ value: >>", value);

    // const id = await createWordSchema(req.body);
    res.status(200).json(value);
  }

  // console.log("handler ~ req: >>", req.body);
}
