const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports.create=client.tokens.create();