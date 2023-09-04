const { expect } = require("chai");
const axios = require("axios")



describe("GET /Cart", function () {
    it("Get Cart By Id ", async function () {
        const result = await axios.post("http://localhost:4000/cart", { user: "gal" }, {
            headers: {
                authorization: await getTokenHelper()
            }
        })
        const { data } = result;
        const cartId = data.cartId;
        const cartResult = await axios.get(`http://localhost:4000/cart/${cartId}`, {
            headers: {
                authorization: await getTokenHelper()
            }
        })
        expect(cartResult.status).equal(200)
        expect(typeof cartResult.data).equal("object")
        const isProductsArray = Array.isArray(cartResult.data["products"]);
        expect(isProductsArray).equal(true)
    })
})
describe("POST /Cart", function () {
    it("Create new cart and recieved id ", async function () {
        const result = await axios.post("http://localhost:4000/cart", { user: "gal" }, {
            headers: {
                authorization: await getTokenHelper()
            }
        })
        const { data } = result;
        expect(data.message).equal("ok")
        expect(typeof data.cartId).equal('string')
        expect(data.cartId.length).equal(36)
    })

    it("Create new cart without user return 400", async function () {
        try {
            const result = await axios.post("http://localhost:4000/cart", null, {
                headers: {
                    authorization: await getTokenHelper()
                }
            })
            throw new Error("MAKE THE TEST FAILED ANYWAY")
        } catch (error) {
            expect(error?.response?.status).equal(400)
        }
    })
})

describe("PUT /:cartId", function () {
    it("Add Product to Cart ", async function () {
        const result = await axios.post("http://localhost:4000/cart", { user: "gal" }, {
            headers: {
                authorization: await getTokenHelper()
            }
        })
        const { data } = result;
        const cartId = data.cartId;
        const cartResult = await axios.put(`http://localhost:4000/cart/${cartId}`, null, {
            headers: {
                authorization: await getTokenHelper()
            }
        })
        expect(cartResult.status).equal(200)
        expect(cartResult.data.message).equal("Product added")
    })
})



async function getTokenHelper() {
    const dummyUser = {
        email: `email${Date.now()}@gmail.com`,
        password: "1234",
        gender: "male",
        phone: "050602151"
    }
    const signUpResult = await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
    expect(signUpResult.status).equal(200)

    const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: dummyUser.email, password: dummyUser.password })
    return resultLogin.data.token;

}

module.exports = { getTokenHelper }

