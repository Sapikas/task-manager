const app = require('./index');

// const multer = require('multer');
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   res.status(503).send('Maintenance mode');
// });

// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000 //1 MB
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('File must be a Word document!'));
//     }
//     cb(undefined, true);
//   }
// });
// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message });
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
  // const task = await Task.findById('641d894e21c3245338117395');
  // await task.populate('owner');
  // console.log(task.owner);

  // const user = await User.findById('641c5f9b929ef0dba847e819');
  // await user.populate('tasks');
  // console.log(user.tasks);
// }

// main();