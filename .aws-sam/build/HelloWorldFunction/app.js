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

        // .aws/credentialsのProfile情報から読み込み
        const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    
        // SSMクライアントを作成
        const ssm = new AWS.SSM(credentials);

        const request = {
            Name: env, // パラメータ名
            WithDecryption: true      // 暗号化されている場合は復号し、暗号化されていない場合は何もしない
        };
        const ssmRes = await ssm.getParameter(request).promise();
        ssmValue = ssmRes.Parameter.Value;
    
        // Environmentの値を取得
        console.log("env: " + env);
        // EnvironmentのデータからSSMを取得
        console.log("SSM: " + ssmValue);

        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: ssmValue + 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
