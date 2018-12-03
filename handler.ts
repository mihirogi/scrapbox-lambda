import { APIGatewayProxyHandler } from 'aws-lambda';

export const getArts: APIGatewayProxyHandler = async (event, context) => {

  const URL = "https://scrapbox.io/api/pages//art-mihirogi";

  let response;
  await request(URL).then((data) => {
      response = data;
    }
  );

  let urls = [];
  for (let value of response['pages']) {
    urls.push(value['image'])
  }


  return {
    statusCode: 200,
    body: JSON.stringify({
      message: urls,
    }),
  };
};

const request = (url) => {
  return new Promise((resolve => {
      const https = require('https');
      https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          resolve(JSON.parse(body));
        });
      });
    })
  );
};
