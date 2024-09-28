import postgres from "postgres"

export const sql = postgres({
  database: "frisbee_v1",
  hostname: "localhost",
  username: "jack",
  port: 5432,
})
