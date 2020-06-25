const express = require('express');
const FastSpeedtest = require("fast-speedtest-api");

const app = express();
app.use(express.json());

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;

let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
    proxy: 'http://optional:auth@my-proxy:123' // default: undefined
});

//READ Request Handlers
app.get('/', (req, res) => {
  speedtest.getSpeed().then(s => {
    res.json({ 'speed': s, 'unit': 'Mbps', 'error': null });
  }).catch(e => {
      res.json({ 'speed': 0, 'unit': 'Mbps', 'error': e.message});
  });  
});

app.listen(port, () =>{
 console.log(`Listening on port ${port}..`);
});