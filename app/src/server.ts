import {createId} from "@paralleldrive/cuid2"
import {z} from "zod"
import {newAct} from "./db/newAct"
import {sql} from "./db/sql_setup"

const createUserAct = newAct({
  in: z.object({
    email: z.string().email(),
    pw: z.string(),
  }),
  out: z.object({
    id: z.string(),
  }),
  do: async (data) => {
    const [user] = await sql`
        INSERT INTO users ${sql({
          id: createId(),
          email: data.email,
          password: Bun.password.hashSync(data.pw),
        })}
        RETURNING id
      `
    return user
  },
})

const getUserAct = newAct({
  in: z.string(),
  out: z.array(
    z.object({
      id: z.string(),
      email: z.string(),
    })
  ),
  do: async (id) => sql`
    SELECT id, email
    FROM users
    WHERE id = ${id}
  `,
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

  const bob = await createUserAct({
    email: "bob@example.com",
    pw: "bobs-password",
  })

  const [bob2] = await getUserAct(bob.id)

  console.log("bob", bob2)
}

await main()
console.log("done")
process.exit() // some reason bun does not exit on its own
