import { Router } from 'express';
import createError from 'http-errors';

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
    if (!story) {
      return next(new createError.NotFound());
    }
    return res.send(story);
  });
}

const router = new Router();

router.get('/', getAll);
router.get('/:id', getStoryById);

export default router;
