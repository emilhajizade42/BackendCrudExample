const express = require('express')
const multer = require('multer')

const app = express()
const port = 5000
const bodyParser = require('body-parser')

app.use(express.static(__dirname+'/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})




let idCounter = 3

let data = [
    {
        id:1,
        name:"emil",
        surname:"hajizade"
    },
    {
        id:2,
        name:"kenan",
        surname:"Amirov"
    },
    {
        id:3,
        name:"Abulfaz",
        surname:"Sadiqov"
    },
]

app.post('/stats', upload.single('uploaded_file'), function (req, res) {
    console.log(req.file, req.body)
    res.send("oldu")
 });

// get  for products
app.get('/', (req, res) => {
  res.send(data)
})

app.post("/", upload.single('uploaded_file'), function (req, res) {
    const body = req.body;
    idCounter++
    body.id = idCounter
    body.img = ("http://localhost:5000/images/").concat(req.file.filename ) || "Foto not found"
    data.push(body)
    res.send(body)
  })

app.put("/:id",(req, res) => {
    const id = req.params.id;
    const body = req.body;
    element =  data.find(item=>item.id == id)
    body.id = element.id
    data =  data.filter(item=>item.id != id)
    data.push(body)
    res.send(body)
  })

app.delete("/:id", (req, res) => {
    const id = req.params.id;
    data =  data.filter(item=>item.id != id)
    res.send(id)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})