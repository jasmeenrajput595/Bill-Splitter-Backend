import GroupName from '../models/GroupSchema.js'

export async function CreateGroup(req , res){
    try{
        console.log(req.body)
        const {groupName , userIds} = req.body;
        const group = new GroupName({
            groupName,
            userIds
            });
            await group.save();
            res.status(201).json({
                message: "Group created successfully",
                group
            })
        }catch(error){
            res.status(500).json({
                message : "Something went wrong hghhghg",
                error
            })
        }
}


//  get groups..
export async function GetGroups(req, res) {
  try {
    const groups = await GroupName.find();

    res.status(200).json({
      message: "Got users successfullyy",
      groups,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
}

