const express = require('express')
const { open } = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
app.use(cors()) //Cross Origin Resource Sharing

const dbPath = path.join(__dirname, 'roxiler.db')
let db

const initializeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(3000, () => {
            console.log(`Server Running at http://localhost:3000/`)
        });
    } catch (error) {
        console.log(`DB Error: ${error.message}`)
        process.exit(1)
    }
}
initializeDbAndServer()

//API
app.get('/transactions/', async (request, response) => {
    try {

        const { month = 3, page = 1, pageSize = 10, search = '' } = request.query

        const monthFilter = month ? `ltrim(strftime('%m', date_of_sale), '0') = '${month}'` : '1=1'
        const query = `
    SELECT * FROM products
       WHERE ${monthFilter} AND
       ((title LIKE '%${search}%') OR 
       (description LIKE '%${search}%') OR
       (price = '${search}'))
       LIMIT ${pageSize}
       OFFSET ${(page - 1) * pageSize}
    `
        const data = await db.all(query)

        const totalCountQuery = `
    SELECT COUNT(*) as totalCount
    FROM products
    WHERE ${monthFilter} AND
       ((title LIKE '%${search}%') OR 
       (description LIKE '%${search}%') OR
       (price = '${search}'))
    `;
        const { totalCount } = await db.get(totalCountQuery)
        const totalPages = Math.ceil(totalCount / pageSize)
        const hasNextPage = page < totalPages


        response.send({
            data,
            hasNextPage,
        })
    } catch (error) {
        console.error(`API Error: ${error.message}`);
        response.status(500).send('Internal Server Error')
    }
})