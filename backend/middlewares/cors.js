// const allowedCors = [
//   'localhost:3000',
//   'http://localhost:3000',
//   'http://saitovkms.nomoredomains.xyz/',
//   'https://saitovkms.nomoredomains.xyz/',
// ];
// // eslint-disable-next-line consistent-return
// const cors = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     // res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', true);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.status(200).end();
//   }
//   next();
// };
// module.exports = { cors };


const cors = require('cors');

const allowedCors = {
  origin: [
    'https://saitovkms.nomoredomains.xyz/',
    'http://saitovkms.nomoredomains.xyz/',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);





// const cors = require('cors');

// const listUrl = () => {
//   const { NODE_ENV } = process.env;
//   let list = [];
//   if (NODE_ENV) {
//     list = [
//       'https://saitovkms.nomoredomains.xyz/',
//     ];
//   } else {
//     list = [
//       'http://localhost:3000',
//       'http://localhost:3001',
//     ];
//   }
//   return list;
// };

// const allowedCors = {
//   origin: listUrl(),
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// };

// module.exports = cors(allowedCors);