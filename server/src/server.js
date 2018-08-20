import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);

// Body parser
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../public`))
app.use(express.static(`${__dirname}/../admin`))
app.get('/admin/*', (req, res) => {
	res.sendFile(`${__dirname}/../../production/admin/index.html`)
})
// Router
import post from './routes/post.routes'
import comment from './routes/comment.routes'
import config from './routes/config.routes'
app.use('/api/posts', post);
app.use('/api/comments', comment);
app.use('/api/config', config);

// Database config
import './mongoConfig.js'

server.listen(port, () => {console.log(`server listens on port: ${port}`)});
