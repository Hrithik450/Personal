import { createRequire } from "module";

const require = createRequire(import.meta.url);
const faqsdata = require("../data/faqs.json");

export const Getfaqsdata = async (req, res) => {
  return res.status(200).json(faqsdata);
};
