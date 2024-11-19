process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app.js");
const items = require("./fakeDb.js");

let testItem = {name: "name1", price: 2};
let testItem2 = {name: "name2", price: 3};
let patchItem = {name: "name1", price: 5};

beforeEach( function() {
    items.push(testItem);
})

afterEach( function(){
    items.length = 0;
})

describe("GET /items", () => {
    test("get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items:[testItem]});
    })
})

describe("GET /items/:name", () => {
    test("get single item", async () => {
        const res = await request(app).get("/items/name1");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item:testItem});
    })
})

describe("POST /items", () => {
    test("create a new item", async () => {
        const res = await request(app).post("/items").send(testItem2);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added:testItem2});
    })
})

describe("PATCH /items/:name", () => {
    test("update an item", async () => {
        const res = await request(app).patch("/items/name1").send(patchItem);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated:patchItem});
    })
})

describe("DELETE /items/:name", () => {
    test("delete an item", async () => {
        const res = await request(app).delete("/items/name1");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message:"Deleted"});
    })
})