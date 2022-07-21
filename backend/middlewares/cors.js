
// const cors = require('cors');

// const allowedCors = {
//   origin: [
//     'https://saitovkms.nomoredomains.xyz/',
//     'http://saitovkms.nomoredomains.xyz/',
//     'http://localhost:3000',
//     'http://localhost:3001',
//   ],
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// };

// module.exports = cors(allowedCors);


const allowedCors = [
  'https://saitovkms.nomoredomains.xyz',
  'http://saitovkms.nomoredomains.xyz',
  'localhost:3000',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.status(200).end();
  }

  next();
});