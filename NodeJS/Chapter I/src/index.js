const express = require('express')
const { v4: uuidv4} = require('uuid')

const app = express()

app.use(express.json())

const customers = []

function verifyUserExists(request, response, next) {
    const { cpf } = request.headers

    const customer = customers.find((customer) => { return customer.cpf === cpf })
    
    if(!customer) {
        return response.status(400).json({ error: "customer not found" })
    }

    request.customer = customer

    return next()
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === 'credit') {
            return acc + operation.amount
        } else {
            return acc - operation.amount
        }
    }, 0)

    return balance
}

// CRIACAO DE CONTA
app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    const customerAlreadyExists = customers.some( (customer) => { return (customer.cpf === cpf) } )
    
    if(customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists" })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send()
})

// EXTRATO BANCARIO
app.get('/statement', verifyUserExists, (request, response) => {
    const { customer } = request
    return response.json(customer.statement)
})

// FAZER DEPOSITO
app.post('/deposit', verifyUserExists, (request, response) => {
    const { description, amount } = request.body

    const { customer } = request

    statementOperation = {
        description,
        amount,
        date: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

//FAZER SAQUE
app.post('/withdraw', verifyUserExists, (request, response) => {
    const { amount } = request.body
    const { customer } = request

    const balance = getBalance(customer.statement)

    if(balance < amount) {
        return response.status(400).json({error: "insuficient funds!"})
    }

    statementOperation = {
        description: "withdraw",
        amount,
        date: new Date(),
        type: 'debit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

// DEPOSITO POR DATA
app.get('/statement/date', verifyUserExists, (request, response) => {
    const { customer } = request
    const { date } = request.query

    const dateFormat = new Date(date + ' 00:00')

    const statement = customer.statement.filter((statement) => { return statement.date.toDateString() === new Date(dateFormat).toDateString()})

    return response.json(statement)
})

// ATUALIZAR CONTA
app.put('/account', verifyUserExists, (request, response) => {
    const { name } = request.body
    const { customer } = request
    
    customer.name = name
    
    return response.status(201).send()
})

// OBTER DADOS DA CONTA
app.get('/account', verifyUserExists, (request, response) => {
    const { customer } = request

    return response.json(customer)
})

// DELETAR CONTA
app.delete('/account', verifyUserExists, (request, response) => {
    const { customer } = request

    customers.splice(customer, 1)

    return response.status(200).json(customers)
})

// SALDO DA CONTA
app.get('/balance', verifyUserExists, (request, response) => {
    const { customer } = request

    const balance = getBalance(customer.statement)

    return response.json(balance)
})


app.listen(3333)