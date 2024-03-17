import { NextApiRequest, NextApiResponse } from "next";
import { sampleUnitData } from "@/utils/sample-unit-data";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUnitData)) {
      throw new Error("Cannot find unit data");
    }

    res.status(200).json(sampleUnitData);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
