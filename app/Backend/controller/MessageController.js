import { Messages } from "../model/messageModal.js"

export const sendMessage = async(req,res)=>{
    const {message} = req.body
    const {sender_id,receiver_id} = req.params

    

    // check if any message exists
   let findChat = await Messages.findOne({
    $or:
    [
    {$and:[{sender_id:sender_id},{receiver_id:receiver_id}]},
    {$and:[{sender_id:receiver_id},{receiver_id:sender_id}]}
    ]
   })

   if(!findChat){
    let newChat = await Messages.create({
        chats:[{message,sender_id,receiver_id}],
        sender_id,
        receiver_id     
    })
    res.send(newChat)
   }else{
    findChat.chats.push({message,sender_id,receiver_id})
    await findChat.save()
    res.send(findChat)
   }

}


// get message


export const getMyMessages = async(req,res)=>{
      const {sender_id,receiver_id} = req.params


       let myChat = await Messages.findOne({
        $or:
        [
            {$and:[{sende_id:sender_id},{receiver_id:receiver_id}]},
            {$and:[{sender_id:receiver_id},{receiver_id:sender_id}]}
        ]
       })

       if(!myChat){
        res.send([])
       }else{
        res.send(myChat)
       }

}