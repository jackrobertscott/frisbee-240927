import {createId} from "@paralleldrive/cuid2"
import postgres from "postgres"

const sql = postgres({
  database: "frisbee_v1",
  hostname: "localhost",
  username: "jack",
  port: 5432,
})

async function main() {
  await sql`DROP TABLE IF EXISTS users`

  await sql`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`

  await sql`
    INSERT INTO users (
      id,
      email,
      password
    )
    VALUES (
      ${createId()}, 
      ${"jack@example.com"}, 
      ${Bun.password.hashSync("password")}
    )
  `

  await sql`
    INSERT INTO users ${sql({
      id: createId(),
      email: "fred@example.com",
      password: Bun.password.hashSync("password"),
    })}
  `
}

await main()

console.log("done")
