import { getConfig } from '../config/global_config'
import mysql from 'mysql'
const mysqlConfig = getConfig('/mysqlConfig')

const db = mysql.createPool({
  connectionLimit: mysqlConfig.connectionLimit,
  acquireTimeout: 30000,
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
})

export { db }
