import mysql from "mysql2/promise";
async function run() {
  const con = await mysql.createConnection({host: '127.0.0.1', port: 3307, user: 'root', password: 'd4taMa1n162738'});
  await con.query('CREATE DATABASE IF NOT EXISTS `cold-db-mysql`;');
  console.log('DB Created');
  process.exit(0);
}
run().catch(console.error);
