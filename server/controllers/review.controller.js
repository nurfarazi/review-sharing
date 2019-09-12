const Joi = require('@hapi/joi');
const Review = require('../models/review.model');
let objectId = require('mongoose').Types.ObjectId;

const userSchema = Joi.object({
  body: Joi.string().required()
});

module.exports = {
  insert,
  fetch,
  vote
};

async function insert(formData, userId) {
  formData = await Joi.validate(formData, userSchema, {abortEarly: false});

  formData.createdBy = userId;
  return await new Review(formData).save();
}

async function fetch() {
  const pipeline = [
    {
      "$lookup": {
        "from": "users",
        "localField": "createdBy",
        "foreignField": "_id",
        "as": "user"
      }
    },
    {
      "$unwind": {
        "path": "$user",
        "includeArrayIndex": "arrayIndex",
        "preserveNullAndEmptyArrays": false
      }
    },
    {
      "$sort": {
        "createdAt": -1
      }
    }
  ];

  return Review.aggregate(pipeline).exec();
}

async function vote(id, vote) {
  let voteType = {};

  if (vote === 'up')
    voteType.upVote = 1;
  else if (vote === 'down')
    voteType.downVote = 1;
  else return;

  return Review.update(
    {_id: objectId(id)},
    {$inc: voteType}
  )
}
