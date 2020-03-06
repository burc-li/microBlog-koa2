/**
 * @description jest server
 */

 const supertest = require('supertest')
 const server = require('../src/app').callback()

 module.exports = supertest(server)