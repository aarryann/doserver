import { PubSub } from "apollo-server";
import Knex from "knex";

export const getMe = async req => {
  try {
    const Authorization = req.get("Authorization");
    const token = Authorization.replace("Bearer ", "");
    const rows = await knex("sessions as s")
      .innerJoin("User as u", "s.user_id", "u.id")
      .where("s.uid", token)
      .where("s.expiry", ">", "now()")
      .select("u.*");

    const user = rows[0];
    return { userId: user.id, token };
  } catch (e) {
    throw new AuthError();
  }
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export const pubsub = new PubSub();

export const knex = Knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  searchPath: ["knex", "public"]
});
