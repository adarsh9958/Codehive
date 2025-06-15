const Joi = require("joi");

const postSchema = Joi.object({
  post: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    code: Joi.string().required(),
    likes: Joi.number().min(0),
  }).required(),
});

const commentSchema = Joi.object({
  comment: Joi.object({
    comment: Joi.string().required()
  }).required(),
});

module.exports = {postSchema,commentSchema};
// This module exports a Joi schema for validating post data