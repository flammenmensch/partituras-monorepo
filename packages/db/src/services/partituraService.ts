import mongoose from "mongoose";
import PartituraSchema from '../schemas/Partitura';

const Partitura = mongoose.model('Partitura', PartituraSchema);

export const findById = (id: string) =>
  Partitura.findById(id).lean();

export const findAll = (offset = 0, pageSize = 10) => {
  const count = Partitura.countDocuments().lean();
  const items = Partitura.find().skip(offset).limit(pageSize).lean();

  return Promise
    .all([count, items])
    .then(([ total, found]) => ({ items: found, total }));
};

export const search = (query: string = '') =>
  Partitura
    .find({ $text: { $search: query } })
    .lean()
    .then((found) => ({ items: found }));

export const getRandom = (count = 10) =>
  Partitura
    .aggregate([ { $sample: { size: count } } ])
    .then((found) => ({ items: found }));
