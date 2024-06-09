import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '@/db/schema'

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASS as string,
})
const db = drizzle(poolConnection)

db.select().from(schema.adminTable).then(console.log).catch(console.error)
export default db
