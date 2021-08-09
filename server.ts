import express from "express"
import path from "path"
import cors from "cors"
import mongoose from "mongoose"
const app = express();
var AuthRouter = require('./routes/auth')
var WishRouter = require('./routes/wish')
var CartRouter = require('./routes/cart')
const PORT = process.env.PORT;
const mongoURI = process.env.ATLAS_URI
 const connection = mongoose.connect(mongoURI,
  {
    useNewUrlParser: true,
  useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify: false
 })
 .then(()=>console.log('MongoDB database connected successfully'))
 .catch(error=>console.error(error))

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', AuthRouter);
app.use('/api/wish', WishRouter);
app.use('/api/cart', CartRouter);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});