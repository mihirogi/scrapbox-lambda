import { APIGatewayProxyHandler } from 'aws-lambda';

export const getArts: APIGatewayProxyHandler = async (event, context) => {

  const URL = "https://scrapbox.io/api/pages/art-mihirogi";

  const urls = await request(URL).then((response) => {
      return response['pages'].map(json => (
          {
            title: json['title'],
            url: json['image']
          }
        )
      );
    }
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    },
    body: JSON.stringify({
      message: urls,
    }),
  };
};

const request = (url: string) => {
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

