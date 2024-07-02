const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': '1EdU/vJY33JWmEYxLSyfcYI/FGRAZsMRfGL1EewXSXA=',
  },
};

fetch('https://openapiv1.coinstats.app/coins', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
