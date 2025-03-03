const express =  require("express");
const Song = require("./models/song")
var cors = require('cors')
// HAD TO USE jsonwebtoken BECAUSE json-simple DID NOT WORK (FOR ME)
const jwt = require('jsonwebtoken')
const User = require('./models/users')

const app = express();
app.use(cors());

app.use(express.json())
 
const router = express.Router();
const secret = "supersecret"

router.post("/user", async(req, res) =>{
   if(!req.body.username || !req.body.password){
      res.status(400).json({error: "Missing username or password"})
   }

   const newUser = await new User({
      username: req.body.username,
      password: req.body.password,
      status: req.body.status

   })

   try{
      await newUser.save()
      console.log(newUser)
      res.sendStatus(201)
   }
   catch(err){
      res.status(400).send(err)
   }
})

//authenticate or login
//post request = new 'session'
router.post("/auth", async (req, res) => {
   if (!req.body.username || !req.body.password) {
     res.status(400).send("Missing username or password");
     return;
   }
   console.log(req)
   let user = await User.findOne({ username: req.body.username });
   if (!user) {
     res.status(401).json({ error: "Bad Username" });
   } else if (user.password != req.body.password) {
     res.status(401).send("Bad password");
   } else {
     username2 = user.username;
     // WHERE THE JWT DIFFERS
     const token = jwt.sign({ username: user.username }, secret);
     const auth = 1;
 
     res.json({ username2, token: token, auth: auth });
   }
});

router.get("/status", async(req, res) =>{
   if (!req.headers["x-auth"]) {
      return res.status(401).json(
         { error: "Missing X-Auth header" });
   }
   // if x-auth contains the token
   const token = req.headers["x-auth"];
   try {
      // not using jwt-simple
      const decoded = jwt.verify(token, secret);

      let users = User.find({},"username status");
      res.json(users);
   }
   catch (ex) {
      res.status(401).json({ error: ex.message });}
});

//grab all the songs in database
router.get("/songs", async(req,res) =>{
   try{
      const songs = await Song.find({})
      res.send(songs)
      console.log(songs)
   }
   catch (err){
      console.log(err)
   }
})

router.get("/songs/:id", async (req, res) => {
   try{
      const song = await Song.findById(req.params.id)
      res.json(song)
   }
   catch(err){
      res.status(400).send(err)
   }
})


router.post("/songs", async(req,res) =>{
   try{
      const song = await new Song(req.body)
      await song.save()
      res.status(201).json(song)
      console.log(song)
   }
   catch(err){
      res.status(400).send(err)
   }
})

router.put("/songs/:id", async(req, res) =>{
   try{
      const song = req.body
      await Song.updateOne({_id: req.params.id},song)  
      console.log(song)
      res.sendStatus(204)
   }
   catch(err){
      res.status(400).send(err)  
   }
})

router.delete("/songs/:id", async(req, res) =>{
   try{
      const song = req.body
      await Song.deleteOne({_id: req.params.id},song)  
      console.log(song)
      res.sendStatus(204)
   }
   catch(err){
      res.status(400).send(err)  
   }
})

// all requests that usually use an api start with /api... so the url woul be localhost:3000/api/songs
app.use("/api", router);
app.listen(3000);
