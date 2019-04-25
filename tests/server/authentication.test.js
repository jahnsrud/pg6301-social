const {app} = require('../../src/server/app');
const request = require('supertest');

test("Should not sign in", async () =>{

    const response = await request(app)
        .post('/api/login')
        .send({userId:'foo_' + (counter++), password:"bar"})
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(401);


});