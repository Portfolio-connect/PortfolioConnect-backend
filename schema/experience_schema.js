import Joi from "joi";


export const experienceSchema = Joi.object({
        companyName: Joi.string().required(),
            role: Joi.string(),
            responsibility: Joi.string().required(),
            location: Joi.string(),
            startDate: Joi.string(),
            endDate: Joi.string()
    
});

