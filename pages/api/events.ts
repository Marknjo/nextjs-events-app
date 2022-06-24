import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

type Data = {
  data: { content: string };
  status: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const getData = join(process.cwd(), "data", "data.json");
    const content = readFileSync(getData, "utf-8");

    res.status(200).json({
      status: "success",
      data: {
        content,
      },
    });
  }
}
