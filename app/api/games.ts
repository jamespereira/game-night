import { NextApiRequest, NextApiResponse } from "next";
import { sampleGameData } from "@/utils/sample-game-data";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleGameData)) {
      throw new Error("Cannot find unit data");
    }

    res.status(200).json(sampleGameData);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
