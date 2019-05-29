const Zenon = require('./Zenon.js');
const client = new Zenon();
require('dotenv').config();

client.login(process.env.TOKEN).catch(async(err) =>  {
    await console.log(err);
});