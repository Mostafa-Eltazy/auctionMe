import joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

export const createAuctionSchema = {
  body: joi
    .object()
    .keys({
      title: joi.string().required(),
      startDate: joi.string().required(),
      endDate: joi.string().required(),
      type: joi.string().required(),
      startingBid: joi.number().required(),
    })
    .required(),
};
