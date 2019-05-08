import { Router } from 'express';

import Story from '../models/Story';

function getAll(req, res, next) {
  return Story.find({}, (err, stories) => {
    if (err) {
      return next(err);
    }
    return res.send(stories);
  });
}

function getStoryById(req, res, next) {
  return Story.findById(req.params.id, function(err, story) {
    if (err) {
      return next(err);
    }
    res.send(story);
  });
}

const router = new Router();

router.get('/', getAll);
router.get('/:id', getStoryById);

export default router;
