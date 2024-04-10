import express from 'express'
import ditto from './ditto.json' assert {type:'json'}
const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')

app.get('/', (req,res) => {
    res.json(ditto)
})

app.post('/pokemon', (req,res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        res.status(201).json(data)
    })
})

app.use((req,res) => {
    res.send('<h1>ERROR 404 NOT FOUND</h1>')
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})