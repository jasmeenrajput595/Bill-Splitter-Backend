import Group from "../models/Group.js";

export const createGroup = async (req, res) => {
  try {
    const { groupName, members } = req.body;

    if (!groupName || !members || members.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Group name and members are required",
      });
    }


    if (!members.includes(req.user._id.toString())) {
      members.push(req.user._id);
    }

    const group = await Group.create({
      groupName,
      members,
    });

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      group,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get groups
export const getGroups = async (req, res) => {
  try {

    const groups = await Group.find({
      members: req.user._id,
    }).populate("members", "name email");

    res.status(200).json({
      success: true,
      groups,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const addMembers = async (req, res) => {
  try {

    const {memberIds} = req.body;
    const group = await Group.findByIdAndUpdate
      req.params.groupId,
      memberIds
      // {
      //   $addToSet:{
      //     members :{
      //       $each : memberIds,
      //     }
      //   }
      // }
    console.log(memberIds)                                                   
    res.status(200).json({
      success: true,
      group,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

