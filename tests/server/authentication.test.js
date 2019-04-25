const request = require('supertest');
const app = require('../../src/server/app');

// https://github.com/arcuri82/web_development_and_api_design/blob/2504d128d55bf9ff800d1058c45b7cf5e21f2060/les08/authentication/tests/server/routes-test.js
let counter = 0;


test("Test fail login", async () =>{

    const response = await request(app)
        .post('/api/login')
        .send({userId:'foo_' + (counter++), password:"bar"})
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(401);
});
