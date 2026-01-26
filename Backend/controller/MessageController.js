import { Messages } from "../model/messageModal.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { sender_id, receiver_id } = req.params;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // check if any message exists
    let findChat = await Messages.findOne({
      $or: [
        { $and: [{ sender_id: sender_id }, { receiver_id: receiver_id }] },
        { $and: [{ sender_id: receiver_id }, { receiver_id: sender_id }] }
      ]
    });

    if (!findChat) {
      let newChat = await Messages.create({
        chats: [{ message, sender_id, receiver_id, timestamp: Date.now() }],
        sender_id,
        receiver_id
      });
      await newChat.populate('sender_id', 'username fullName');
      await newChat.populate('receiver_id', 'username fullName');
      res.status(201).json(newChat);
    } else {
      findChat.chats.push({ message, sender_id, receiver_id, timestamp: Date.now() });
      await findChat.save();
      await findChat.populate('sender_id', 'username fullName');
      await findChat.populate('receiver_id', 'username fullName');
      res.json(findChat);
    }
  } catch (error) {
    next(error);
  }
};

export const getMyMessages = async (req, res, next) => {
  try {
    const { sender_id, receiver_id } = req.params;

    let myChat = await Messages.findOne({
      $or: [
        { $and: [{ sender_id: sender_id }, { receiver_id: receiver_id }] },
        { $and: [{ sender_id: receiver_id }, { receiver_id: sender_id }] }
      ]
    })
      .populate('sender_id', 'username fullName')
      .populate('receiver_id', 'username fullName');

    if (!myChat) {
      res.json([]);
    } else {
      res.json(myChat);
    }
  } catch (error) {
    next(error);
  }
};