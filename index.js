const DB = require('./dynamo');
const Dynamo = new DB();

exports.handler = async (event) => {
    console.log(event);
    if (event.httpMethod === 'GET') {
        let response = await getQuestion(event);
        return done(response);
    }
};

const done = response => {
    return {
        statusCode: '200',
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        }
    }
}

const getQuestion = async event => {
    let id = event.pathParameters.id;
    
    let data = await Dynamo.scan('id', id, 'TestApp');
    let result = data.Items.sort((a,b) => b.count - a.count);
    result = result.map(({})=> { return {}});
    return data;
}

