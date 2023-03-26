require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');

// Task.findByIdAndDelete('641c0f8275bf97c698b25964').then((task) => {
//   console.log(task);
//   return Task.countDocuments({ completed: false });
// }).then((count) => {
//   console.log(count);
// }).catch((err) => {
//   console.log(err);
// });

// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age });
//   const count = await User.countDocuments();
//   return count;
// }

// (updateAgeAndCount('641c0d3bbe319e68c4dcca6d', 4)).then((count) => {
//   console.log(count);
// }).catch((e) => {
//   console.log(e);
// });

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deleteTaskAndCount('641c09516526b7460bc07502').then((count) => {
  console.log(count);
}).catch((e) => {
  console.log(e);
})