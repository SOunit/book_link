const Value = require('../models/value');

exports.getHi = (req, res, next) => {
  res.send('hi');
};

exports.getValues = async (req, res) => {
  const values = await Value.fetchAll();
  res.send(values.rows);
};

exports.postValue = async (req, res) => {
  // parseInt returns number or NaN
  let index = parseInt(req.body.index);

  // set -1 if index is not a number
  if (isNaN(index)) {
    index = -1;
  }

  // update db
  const value = new Value(index);
  value.save();

  res.send({ working: true });
};
