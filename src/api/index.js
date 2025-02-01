import express from 'express'
import users from './users/api.js'
import documents from './documents/api.js'
import ai from './ai/api.js'
import goals from './goals/api.js'
import notes from './notes/api.js'
import projects from './projects/api.js'
import medias from './medias/api.js'
import products from './products/api.js'
import stories from './stories/api.js'

const app = express()

app.use('/users', users)
app.use('/documents', documents)
app.use('/ai', ai)
app.use('/goals', goals)
app.use('/notes', notes)
app.use('/projects', projects)
app.use('/products', products)
app.use('/stories', stories)

app.use('/medias', medias)

export default app
