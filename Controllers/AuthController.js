import User from '../models/UserSchema.js'
export async function Register(req, res) {
  console.log("errorrr")
  try {
    const {name, email, password } = req.body;
    const existingUser = await User.findOne({email})
    if(existingUser){
      return res.status(400).json({
        message: "Email already exists"
      })
    }
    const User = new UserLogin({
      name,
      email,
      password,
    });
    await User.save();
    res.status(201).json({
      message: "Registeration successfully",
      User,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong here",
      error,
    });
  }
}

//  Login
export async function Login(req, res) {
  try {
    const {email, password } = req.body;
     const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({
        message: "User Not Fount"
      })
    }

    if(user.password !== password){
      return res.status(401).json({
        message: "Invalid Password"
      })
    }

    res.status(200).json({
       message : "Login successfull",
        user,
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: "Something went wrong",
    error: error.message,
  });
}
}

export async function GetUsers(req, res) {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Got users successfullyy",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error : error.message,
    });
  }
}

