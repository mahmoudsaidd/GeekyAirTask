import Joi from "joi";

//want to validate the isbn number to be 10 numbers long

export const addBookSchema= {
   body: Joi.object()
    .keys({
        ISBN: Joi.string().length(10).required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        availableQuantity: Joi.number(),
        shelfLocation: Joi.string()
    })
}

