import UserLogin from '../models/LoginSchema.js'
export async function Login(req, res) {
  console.log("errorrr")
  try {
    const {userId,name, email, password } = req.body;
    const login = new UserLogin({
      userId,
      name,
      email,
      password,
    });
    await login.save();
    res.status(201).json({
      message: "Login successfully",
      login,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong here",
      error,
    });
  }
}

//  Get login details
export async function getLoginDetails(req, res) {
  try {
    const user = await UserLogin.find({
      userId: req.params.userId
    });

    res.status(200).json({
       message : "Login details",
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