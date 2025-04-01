const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken");
const sendEmail = require("../utils/Email");
const { access } = require("fs");
const { console } = require("inspector");

// [POST] /api/users/login
module.exports.login = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
  });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// [POST] /api/users/logout
module.exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out success" });
})

// [POST] /api/users
module.exports.register = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const userExists = await User.findOne({
    email: email,
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// [POST] /api/users/reset_password
module.exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra đầu vào
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email và mật khẩu là bắt buộc.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng với email này.",
      });
    }

    user.password = password;
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Đặt lại mật khẩu thành công.",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
      accessToken: generateAccessToken(updatedUser._id),
      refreshToken: generateRefreshToken(updatedUser._id),
    });
  } catch (error) {
    console.error("Lỗi khi đặt lại mật khẩu:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.",
    });
  }
});

// [GET] /api/users/profile
module.exports.profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // req.user._id được gán từ middleware protect

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// [PUT] /api/users/profile
module.exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      avatar: updateUser.avatar,
      createdAt: updateUser.createdAt,
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// [POST] /api/users/create
module.exports.createUsers = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, isAdmin, avatar } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Vui lòng nhập đầy đủ thông tin." 
      });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: "Email đã được đăng ký. Vui lòng sử dụng email khác." 
      });
    }

    const user = new User({
      name,
      email,
      password,
      isAdmin: isAdmin ?? false,
      avatar,
    });

    const createdUser = await user.save();

    return res.status(201).json({
      success: true,
      message: "Tạo tài khoản thành công!",
      data: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        avatar: createdUser.avatar,
        accessToken: generateAccessToken(createdUser._id),
        refreshToken: generateRefreshToken(createdUser._id),
      }
    });

  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.",
      error: error.message
    });
  }
});

// [GET] /api/users/:id
module.exports.getUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// [GET] /api/users
module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user)  {
    const { name, email, isAdmin, avatar } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin ?? user.isAdmin;
    user.avatar = avatar || user.avatar;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      avatar: updatedUser.avatar,
    });
  }
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports.deleteUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
})

// [POST] /api/users/forgot_password
module.exports.forgotPassword = asyncHandler(async (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
