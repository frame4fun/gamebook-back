import createError from 'http-errors';
import { Router } from 'express';

import { findAll, findById } from '../models/Story';

async function getAll(req, res, next) {
  try {
    const stories = await findAll();
    return res.send(stories);
  } catch (err) {
    return next(err);
  }
}

async function getStoryById(req, res, next) {
  try {
    const story = await findById(req.params.id);
    if (!story) {
      return next(new createError.NotFound());
    }
    return res.send(story);
  } catch (err) {
    return next(err);
  }
}

const router = new Router();

router.get('/', getAll);
router.get('/:id', getStoryById);

export default router;
