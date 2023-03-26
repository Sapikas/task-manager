const express = require('express');
const router = new express.Router();
const Tasks = require('../models/task');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  const task = new Tasks({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match: match,
      options: {
        skip: parseInt(req.query.skip),
        limit: parseInt(req.query.limit),
        sort
      }
    });
    res.status(200).send(req.user.tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id, req.user._id);
    const task = await Tasks.findOne({ _id: id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => task[update] = req.body[update]);
    await task.save();
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findOneAndDelete({ _id: id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;