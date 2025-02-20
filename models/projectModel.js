import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const projectSchema = new Schema(
     
        {
            projectName: {type: String},
            description: {type: String},
            contributors: {type: String},
            nameOfInstitution: {type: String},
            startDate: {type: String},
            endDate: {type: String},
            image: {type: String},
            link: {type: String},
            user: {type: Types.ObjectId, ref: 'User'},
        }, {
            timestamps: true,
        }
    
);

projectSchema.plugin(toJSON);

export const Project = model('Project', projectSchema);