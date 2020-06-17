import '@babel/polyfill'
import express from 'express'
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const models = require('./models')
models.sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to SQL database:', 'graphql-mysql-starter')
    })
    .catch((err) => {
        console.error(
            'Unable to connect to SQL database:',
            'graphql-mysql-starter',
            err,
        )
    })

const server = new ApolloServer({
    modules: [require('./app/GraphQL/users')],
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.send('Hello World!'))

app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`),
)
