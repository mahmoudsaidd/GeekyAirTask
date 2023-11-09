import Joi from "joi";

export const addBorrowerSchema= {
    body: Joi.object()
     .keys({
          SSN: Joi.string().length(14).required(),
          //want to make the email at its different popular formats
          email:Joi.string().email(),
          name: Joi.string().required()
     })
    }