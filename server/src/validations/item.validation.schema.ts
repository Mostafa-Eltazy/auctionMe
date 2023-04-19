import joi, { string } from 'joi';

const itemSchema = joi.object({
  name: joi.string().required().min(3).max(30),
  description: joi.string(),
  categoryId: joi.number().required(),
  subCategoryId: joi.number(),
  pictures: joi.array().items(string)
});

export const addItemsSchema = {
  body: joi.object()
    .keys({
      items: joi.object({
        add: joi.array().items(itemSchema).required()
      })
    })
    .required()
};
