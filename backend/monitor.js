import cron from "node-cron";
import { expireSubscriptions } from "./controllers/cryptoController.js";

export async function monitor() {
  cron.schedule("0 * * * *", () => {
    expireSubscriptions();
  });
}
