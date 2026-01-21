// import { User } from "../models/UserModal.js";
import bcrypt from 'react-native-bcrypt'
import { User } from '../model/userModal';

export const registeruser = async (req, res) => {
  const { mobile, password, fullName, username } = req.body;
  if (!mobile || !password || !fullName || !username) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check email or mobile already exists
  let checkEmail = await User.findOne({ mobile });
  let checkUsername = await User.findOne({ username });

  if (checkEmail) {
    res.status(401);
    throw new Error("Email already in use!");
  }

  if (checkUsername) {
    res.status(401);
    throw new Error("Username already in use!");
  }

  // hashing the password

  let hashedPass = await bcrypt.hash(password ,10)

  let newUser = await User.create({
    mobile,
    password:hashedPass,
    fullName,
    username,
  });

  res.send(newUser);
};


export const findUser = async(req,res)=>{
  const {id} = req.params

  const myUser = await User.findById(id)
  res.send(myUser)
}

export const getAllUsers = async(req,res)=>{
   let allUsers = await User.find()
   res.send(allUsers)
} 


export const loginUser = async(req,res)=>{
  const {mobile,password} = req.body

  let findMobile = await User.findOne({mobile})

  if(!findMobile){
    res.status(404)
    throw new Error("Email/mobile does not exist")
  }else{
    if(await bcrypt.compare(password,findMobile.password)){
      res.send(findMobile)
    }else{
       res.status(401)
    throw new Error("Invalid Password")
    }
  }
}