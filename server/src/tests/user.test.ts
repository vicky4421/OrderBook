import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from "supertest"
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'
import { app } from '../app.js';
import { User } from '../models/user.model.js';

// Set up an in-memory MongoDB server for testing
let mongoServer: MongoMemoryServer

// Connect to the in-memory MongoDB server before running tests, clean up after each test, and disconnect after all tests are done
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
}, 120000)

afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) await collections[key].deleteMany({})
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

// Test suite for user registration endpoint
describe("POST /api/v1/users/register", () => {

    it("should register a new user and exclude password from response", async () => {
        const res = await request(app)
            .post("/api/v1/users/register")
            .send({
                username: "Test123",
                name: "Test Name",
                password: "TestPassword"
            })

        expect(res.status).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.username).toBe("test123")
        expect(res.body.data.password).toBeUndefined()
    })

    it("should return 409 if user already exists", async () => {
        // create first user as everything deleted from inmemory db in afterEach block
        await User.create({
            username: "Test123",
            name: "Test Name",
            password: "TestPassword"
        })

        // attempt duplicate registration
        const res = await request(app)
            .post("/api/v1/users/register")
            .send({
                username: "Test123",
                name: "Another Name",
                password: "TestPassword"
            })

        expect(res.status).toBe(409)
        expect(res.body.success).toBe(false)
        expect(res.body.message).toBe("User with username already exists!")
    })

    it("should return 400 when validation fails (short password", async () => {
        const res = await request(app)
            .post("/api/v1/users/register")
            .send({
                username: "Test123",
                name: "Another Name",
                password: "12"
            })

        expect(res.status).toBe(400)
        expect(res.body.success).toBe(false)
    })

})