import createError from 'http-errors';
import { Router } from 'express';

import { findAll, findOne } from '../models/AbstractModelUtils';
import { RequestHandler } from '../types';

const getAll: RequestHandler<unknown, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const stories = await findAll('toto');
    return res.send(stories);
  } catch (err) {
    return next(err);
  }
};

const getStoryById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const story = await findOne('Story', { id: req.params.id });
    if (!story) {
      return next(new createError.NotFound());
    }
    return res.send(story);
  } catch (err) {
    return next(err);
  }
};

const router = Router();

router.get('/', getAll);
router.get('/:id', getStoryById);

export default router;
