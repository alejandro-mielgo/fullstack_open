require('dotenv').config()

const PORT = process.env.PORT
console.log("node env: ", process.env.NODE_ENV)
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}