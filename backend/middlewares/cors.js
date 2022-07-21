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
const cors = require('cors');

const listUrl = () => {
  const { NODE_ENV } = process.env;
  let list = [];
  if (NODE_ENV) {
    list = [
      'https://msprod.nomoredomains.xyz',
    ];
  } else {
    list = [
      'http://localhost:3000',
      'http://localhost:3001',
    ];
  }
  return list;
};

const allowedCors = {
  origin: listUrl(),
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);