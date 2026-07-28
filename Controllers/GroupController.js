import GroupName from '../models/GroupSchema.js'

export  async function CreateGroup(req , res){
    console.log(req.body)
    try{
        const {groupName , userIds} = req.body;
        const group = new GroupName({
            groupName ,
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