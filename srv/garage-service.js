// const cds = require('@sap/cds');
// const axios = require('axios');

module.exports = class GarageService extends cds.ApplicationService {
    init() {

        const { Cars } = cds.entities('sap.garage')
        const { ListOfCars } = this.entities

        // this.after('READ', ListOfCars, each => {
        //     if (each.price > 40000) {
        //         console.log("CHECK")
        //     }
        // })

        // // Reduce stock of ordered books if available stock suffices
        // this.on('submitOrder', async req => {
        //     let { book: id, quantity } = req.data
        //     let book = await SELECT.from(Books, id, b => b.stock)

        //     // Validate input data
        //     if (!book) return req.error(404, `Book #${id} doesn't exist`)
        //     if (quantity < 1) return req.error(400, `quantity has to be 1 or more`)
        //     if (quantity > book.stock) return req.error(409, `${quantity} exceeds stock for book #${id}`)

        //     // Reduce stock in database and return updated stock value
        //     await UPDATE(Books, id).with({ stock: book.stock -= quantity })
        //     return book
        // })

        // // Emit event when an order has been submitted
        // this.after('submitOrder', async (_, req) => {
        //     let { book, quantity } = req.data
        //     await this.emit('OrderedBook', { book, quantity, buyer: req.user.id })
        // })


        return super.init()
    }
}

// /** Generate primary keys for target entity in request */
// // async function genid (req) {
// //   const {id} = await SELECT.one.from(req.target).columns('max(ID) as id')
// //   req.data.ID = id - id % 100 + 100 + 1
// // }

