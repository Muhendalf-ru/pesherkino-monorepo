import { Telegraf } from "telegraf";
import { UserModel } from "db";
import mongoose from "mongoose";
import "dotenv/config";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

(async () => {
  await mongoose.connect("mongodb://localhost:27017/monorepo");

  bot.start(async (ctx) => {
    const user = await UserModel.create({
      name: ctx.from.first_name,
      email: `${ctx.from.id}@tg.local`,
    });
    ctx.reply(`Привет, ${user.name}!`);
  });

  bot.launch();
})();
