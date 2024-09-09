import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  console.log("email :", email, "password :", password);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!emailRegex.test(email)) {
    throw new ApiError(501, "Invalid email format");
  }

  try {
    // Check if the username or email already exists
    const userExist = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email }],
    });

    if (userExist) {
      if (userExist.username === username.toLowerCase()) {
        throw new ApiError(409, "Username already exists");
      }
      if (userExist.email === email) {
        throw new ApiError(409, "Email already exists");
      }
    }

    // Process the avatar file
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar is required");
    }

    // Process the cover image file (if provided)
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    let avatar, coverImage;

    try {
      avatar = await uploadOnCloudinary(avatarLocalPath);
      if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new ApiError(500, "Error uploading images");
    }

    // Create the user
    const user = await User.create({
      fullName,
      avatar: avatar?.url || "",
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });

    // Send response
    return res
      .status(201)
      .json(new ApiResponse(200, user, "User registered successfully"));
  } catch (error) {
    console.error("Error:", error);
    // If error is an instance of ApiError, it means it's a specific error
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    // Handle generic server errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export { registerUser };
