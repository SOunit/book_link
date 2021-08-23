import Value from '../models/value';
import { Request, Response, NextFunction } from 'express';

export const getHi = (req: Request, res: Response, next: NextFunction) => {
  res.send('hi');
};

export const getValues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const values = await Value.fetchAll();
  res.send(values.rows);
};

export const postValue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // parseInt returns number or NaN
  let index = parseInt(req.body.index);

  // set -1 if index is not a number
  if (isNaN(index)) {
    index = -1;
  }

  // update db
  const value = new Value(index);
  await value.save();

  res.send({ working: true });
};
