import "reflect-metadata";
import { Telegraf } from "telegraf";
import mongoose from "mongoose";
import "dotenv/config";
import { UserModel } from "db";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

(async () => {
  await mongoose.connect("mongodb://localhost:27017/monorepo");

  bot.start(async (ctx) => {
    const user = await UserModel.create({
      name: ctx.from.first_name,
      email: `${ctx.from.id}@tg.local`,
    });
    ctx.reply(`Привет!`);
  });

  bot.launch();
})();
