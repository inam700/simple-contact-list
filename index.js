const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//MODELS
const { CONTACTS } = require("./models/contacts");

//USERS
app.post("/api/v1/contacts", (req, res) => {
  const contacts = new CONTACTS(req.body);
  contacts.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userdata: doc,
    });
  });
});
app.get("/api/v1/contacts", (req, res) => {
  CONTACTS.find({}, (err, contacts) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(contacts);
  });
});
app.get('/api/v1/contacts/contact_by_id',(req,res)=>{
  let type = req.query.type;
  let items = req.query.id;

  if(type === "array"){
      let ids = req.query.id.split(',');
      items = [];
      items = ids.map(item=>{
          return mongoose.Types.ObjectId(item)
      })
  }

  CONTACTS.
  find({ '_id':{$in:items}}).
  exec((err,docs)=>{
      return res.status(200).send(docs)
  })
});


app.delete("/api/v1/contacts/:id", (req, res) => {
  let uid = req.params.id.toString();
  CONTACTS.deleteOne({ _id: uid }, (err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(result);
  });
});
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
