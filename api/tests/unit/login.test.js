import request from "supertest"
import {HTTP_OK, HTTP_VALIDATION_ERROR} from "../../src/constants/statusCode";

const baseURL = `http://localhost:${process.env.PORT}`

describe("it will test Login functionality", () => {
    test('it will throw validation error', () => {
        request(baseURL)
            .post('/api/v1/login')
            .then((response) => {
                expect(response.statusCode).toBe(HTTP_VALIDATION_ERROR)
            })
    });

    test('it will pass login', () => {
        const userCredentials = {
            email : "shakilfci461@gmail.com",
            password : "123456789"
        };
        request(baseURL)
            .post('/api/v1/login')
            .send(userCredentials)
            .then((response) => {
                expect(response.statusCode).toBe(HTTP_OK)
            })
    });
});