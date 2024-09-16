import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const { views, subscribers, videos, likes } = req.body;

  if (!(views || subscribers || videos || likes)) {
    throw new Error(400, "Error while fetching details");
    
  }

  const channelDetails = await  

});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const { channelId } = req.params;

  if (!channelId) {
    throw new ApiError(404, "Channel Id is required");
  }

  const videos = await Video.find({channelId})

  if(!videos.length){
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "No videos found on this channel"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {videos}, "Videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
