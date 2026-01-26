import bcrypt from 'bcryptjs';
import { User } from '../model/userModal.js';

export const registeruser = async (req, res, next) => {
  try {
    const { mobile, password, fullName, username } = req.body;
    if (!mobile || !password || !fullName || !username) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // check email or mobile already exists
    let checkEmail = await User.findOne({ mobile });
    let checkUsername = await User.findOne({ username });

    if (checkEmail) {
      return res.status(401).json({ error: "Mobile already in use!" });
    }

    if (checkUsername) {
      return res.status(401).json({ error: "Username already in use!" });
    }

    // hashing the password
    let hashedPass = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      mobile,
      password: hashedPass,
      fullName,
      username,
    });

    // Remove password from response
    newUser.password = undefined;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};


export const findUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const myUser = await User.findById(id).select('-password');
    
    if (!myUser) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(myUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    let allUsers = await User.find().select('-password');
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ error: "Please provide mobile and password" });
    }

    let findMobile = await User.findOne({ mobile });

    if (!findMobile) {
      return res.status(404).json({ error: "Mobile does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, findMobile.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Remove password from response
    findMobile.password = undefined;
    res.json(findMobile);
  } catch (error) {
    next(error);
  }
};