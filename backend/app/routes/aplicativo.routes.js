const multer = require('multer');
const path = require('path');

const imageBasePath = 'uploads/aplicativos/';

// Configure multer
// const imageUploader = multer({
//   dest: 'uploads/aplicativos/',
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const { id } = req.body
    // const path = `./uploads/gallery/${id}`
    // fs.mkdirSync(path, { recursive: true })
    // return cb(null, path)
    cb(null, "./uploads/aplicativos/");
  },
  filename: function(re, file, cb) {
    const pureFilename = file.originalname.split(".")[0];
    const ext = file.mimetype.split("/")[1];
    cb(null, `${pureFilename}-${Date.now()}.${ext}`);
    // cb(null, `${imageBasePath}${file.originalname}`);
  }
});
const imageUploader = multer({
  storage: storage,
  credentials: true
})


module.exports = app => {
  const aplicativo = require("../controllers/scene.controller.js");

  var router = require("express").Router();

  // Create a new Aplicativo
  router.post("/", imageUploader.single('cover'), aplicativo.create);

  // Retrieve all Aplicativos
  router.get("/", aplicativo.findAll);

  // Retrieve a single Aplicativo with id
  router.get("/:id", aplicativo.findOne);

  // Update a Aplicativo with id
  router.put("/:id", aplicativo.update);

  // Delete a Aplicativo with id
  router.delete("/:id", aplicativo.delete);

  // Recebe o upload da imagem
  router.post("/image", imageUploader.single('cover'), (req, res) => {
    console.log(req.file);
    res.json('upload feito com sucesso')
  });

  // Envia a imagem pra download no caso de uma requisição pedindo ela
  router.get("/image/:filename", (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, `${imageBasePath}/${filename}`);
    return res.sendFile(fullfilepath);
  });

  app.use('/api/aplicativo', router);
};