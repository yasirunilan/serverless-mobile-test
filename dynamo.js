const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'ap-south-1'
});

module.exports = class DB {
    scan(key, value, table) {
        return new Promise((resolve, reject) => {
            let params = {
                 TableName: table,
                 FilterExpression: `${key} = :value`,
                 ExpressionAttributeValues: { ':value': value }
             };
             documentClient.scan(params, function(err, data) {
                 if (err) reject(err);
                 resolve(data);
             });
        });
}
}
