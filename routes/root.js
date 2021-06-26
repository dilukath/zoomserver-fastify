'use strict'

const crypto = require("crypto"); // crypto comes with Node.js

module.exports = async function (fastify, opts) {
  fastify.get('/meeting/:meetingNum', async function (request, reply) {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    if(request.params.meetingNum){
      const{meetingNum} = request.params
      const timestamp = new Date().getTime() - 30000;
      const msg = Buffer.from(process.env.API_KEY + meetingNum + timestamp + process.env.ROLE).toString("base64");
      const hash = crypto.createHmac("sha256", process.env.API_SECRET).update(msg).digest("base64");
      const signature = Buffer.from(`${process.env.API_KEY}.${meetingNum}.${timestamp}.${process.env.ROLE}.${hash}`).toString("base64");
      return {"sig":signature}
    }
  })
}
