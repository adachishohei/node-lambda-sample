// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

const AWS = require('aws-sdk');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {

        const env = process.env.SAMPLE_ENV

        console.log(env)

        const credentials = {
            accessKeyId: 'ASIATZ5J7YXTCHUMLPOG',
            secretAccessKey: 'Exz3eN3nfPsyQuNjhmDaZzt6wCCaHVjgXbktPI/z',
            sessionToken: 'IQoJb3JpZ2luX2VjEJX//////////wEaCXVzLWVhc3QtMSJHMEUCIC5LZg1/tVq2VLjAFUv0RZNVuZem1Xe/P7LcaZcq7cnrAiEAyIcpRt9xl1hqqL4gavR/LcT8JuW79OEu2FeNghIzV8AqngIILRAAGgwyNjE4MTI2MzUxMTAiDCLLztqE7wm59hXBhir7AXH1AvtVY12OAoeliwZxgTJJNRGtXR78ZT4nGTVfG6NAL7VvFPsMAnjYV+nye1K6Q/JIs/bvrvBmyFWloXpAfjK7yCdU3+xse0ClwKBXZQ5pWTiOPt/DiXmCnVqxXRRTX9SuvLp1dBOZKQwWi0dqxyncyFx0gPJGAziTRTzpixVl/BKfRCFhwTmcrEUc4IE8OTP9enTHfn0oqxsH2T02CMcqxz/TptTObzJ5PndAUl3wy+LWhmKxEz24zYx79je9gWGKRe7OsXQRU2PlQBYi7Im+jeA3EFqQqb8tn9t67mtMEgFWpr4CrTHBummDVgkVI8+GVNikGZX4O0aJMNi5uP4FOp0B7cp07WD7Lso46r9tN6WWBRvDtoIYOCusqACHQTXtddsZzRF1oB+pN+NOlq+YdY+LAgs0k7v2kQpX8aaaj0bLG3MdnMChZGAdeg9puFvLDNjnHxV0IlyPjy5eB7ivt3HR2hjpBJd8iBOsOqXs5UKw7ZMaWbaq+qUMEMRs6+0NtHE9H11MMUUYFOY7mjscU8NuKWFabeREtSu+FwnfYA==',
            region: 'ap-northeast-1'
        };
    
        // SSMクライアントを作成
        const ssm = new AWS.SSM(credentials);

        const request = {
            Name: env, // パラメータ名
            WithDecryption: true      // 暗号化されている場合は復号し、暗号化されていない場合は何もしない
        };
        const response1 = await ssm.getParameter(request).promise();
    
        console.log("SSM: " + response1.Parameter.Value);

        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: env + 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
