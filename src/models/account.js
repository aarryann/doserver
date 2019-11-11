import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUserDetails = async (knex, id) => {
  const rows = await knex("User")
    .select("*")
    .where("id", id);

  return rows[0];
};

const login = async (knex, email, password, url) => {
  try {
    // this is a convenient time to clear out expired sessions
    knex("sessions")
      .where("expiry", "<", "now()")
      .del();
    const rows = await knex("Tenant as t")
      .innerJoin("TenantAddress as ta", "ta.tenantId", "t.id")
      .innerJoin("TenantUser as tu", "tu.tenantId", "t.id")
      .innerJoin("User as u", "tu.userId", "u.id")
      .where("ta.url", url)
      .andWhere("u.email", email)
      .select("u.*");

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid email or password");
    }
    const session = await knex("sessions").insert({ user_id: user.id }, "uid");

    return {
      userId: user.id,
      sid: session[0]
    };
  } catch (e) {
    throw new Error("Invalid email or password");
  }
};

const currentUser = async (knex, token) => {
  try {
    const rows = await knex("sessions as s")
      .innerJoin("User as u", "s.user_id", "u.id")
      .where("s.uid", token)
      .where("s.expiry", ">", "now()")
      .select("u.*");

    const user = rows[0];
    return {
      userId: user.id,
      sid: sid
    };
  } catch (e) {
    throw new Error("Invalid sid");
  }
};

const signup = async (knex, args, ctx) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password }
  });

  return {
    userId: user.id,
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  };
};

export default { getUserDetails, login, currentUser, signup };
