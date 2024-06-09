import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '@/db/schema'

const poolConnection = mysql.createPool({
  host: 'localhost',
  user: 'mahuser',
  database: 'mahdb',
  password: 'mahpassword',
})
const db = drizzle(poolConnection)

db.select().from(schema.adminTable).then(console.log).catch(console.error)
export default db
