import { Router } from 'express';

import Story from '../models/Story';

function getAll(req, res) {
  return Story.find({}, (err, stories) => {
    if (err) {
      return res.sendStatus(500);
    }
    return res.send(stories);
  });
}

function getStoryById(req, res) {
  return Story.findById(req.params.id, function(err, story) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(story);
  });
}

const router = new Router();

router.get('/', getAll);
router.get('/:id', getStoryById);

export default router;
