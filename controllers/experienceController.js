import { User } from "../models/user_model.js";
import { Profile } from "../models/profileModel.js";
import { Experience } from "../models/experienceModel.js";
import { experienceSchema } from "../schema/experience_schema.js";

export const createUserExperience = async (req, res) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await Experience.create({ ...value, user: userId });

    user.experiences.push(experience._id)

    await user.save();

    res.status(201).json({ 
      message: 'Experience added successfully',
      experience: experience 
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};



export const getAllUserExperience = async (req, res) => {
  try {
    //we are fetching Experience that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id
    const allExperience = await Experience.find({ user: userId });
    // if (allExperience.length == 0) {
    //   return res.status(200).send({ Experience: allExperience });
    // }
    res.status(200).json({ Experience: allExperience });
  } catch (error) {
    return res.status(500).json({ error })
  }
};

export const getOneExperience = async (req, res, next) => {
  try {
      const oneExperience = await Experience.findById(req.params.id)
      if (!oneExperience) {
        return res.status(200).send({ experience: oneExperience });
      }
      res.status(200).json({ experience: oneExperience })
  } catch (error) {
      next(error)
  }
};


export const updateUserExperience = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await Experience.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!experience) {
      return res.status(404).send("experience not found");
    }

    res.status(201).json({ 
      message: 'Experience updated successfully',
      experience: experience 
    });

  } catch (error) {
    return res.status(500).json({ error })
  }
};


export const deleteUserExperience = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).send("experience not found");
    }

    user.experiences.pull(req.params.id);
    await user.save();
    res.status(201).json({ 
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ error })
  }
};
