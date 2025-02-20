
import { Skills } from "../models/skillModel.js";
import { skillSchema } from "../schema/skill_schema.js";
import { User } from "../models/user_model.js";


export const createUserSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skills.create({ ...value, user: userId });

    user.skills.push(skill._id)

    await user.save();

    res.status(201).json({ 
      message: 'Skill added successfully',
      skill: skill 
    });
  } catch (error) {
    return res.status(500).send(error)
  }
};



export const getAllUserSkills = async (req, res) => {
  try {
    // fetching Skill that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id
    const allSkill = await Skills.find({ user: userId });
    // if (allSkill.length == 0) {
    //   return res.status(200).send({ Skills: allSkill });
    // }
    res.status(200).json({ Skills: allSkill });
  } catch (error) {
    return res.status(500).json({ error })
  }
};

export const getOneSkill = async (req, res, next) => {
  try {
    const oneSkill = await Skills.findById(req.params.id)
    if (!oneSkill) {
      return res.status(200).send({ skill: oneSkill });
    }
    res.status(200).json({ skill: oneSkill })
  } catch (error) {
    next(error)
  }
};


export const updateUserSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skills.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!skill) {
      return res.status(404).send("Skill not found");
    }

    res.status(201).json({ 
      message: 'Skill updated successfully',
      skill: skill 
    });
  } catch (error) {
    return res.status(500).json({ error })
  }
};


export const deleteUserSkill = async (req, res) => {
  try {


    const userId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skills.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).send("Skill not found");
    }

    user.skills.pull(req.params.id);
    await user.save();
    res.status(201).json({ 
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ error })
  }
};
