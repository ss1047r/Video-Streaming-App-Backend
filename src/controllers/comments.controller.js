import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiError(400, "Video Id is required");
  }

  const pageNumber = parseInt(page, 10);
  const pageSIZE = parseInt(limit, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    throw new ApiError(400, "Invalid page number");
  }

  if (isNaN(pageSIZE) || pageSIZE < 1) {
    throw new ApiError(400, "Invalid limit number");
  }

  // Calculate the number of documents to skip for pagination
  const skip = (pageNumber - 1) * pageSIZE;

  const comments = await Comment.find({ video: videoId })
    .skip(skip)
    .limit(pageSIZE)
    .select("-owner -video");

  if (!comments.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No comments found for this video"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comments, page: pageNumber, limit: pageSIZE },
        "Comments fetched successfully"
      )
    );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { content, videoId } = req.body;

  if (!content) {
    throw new ApiError(400, "No comment found");
  }
  if (!videoId) {
    throw new ApiError(400, "Video Id is required");
  }

  const newComment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comment: newComment },
        "Comment added successfully"
      )
    );
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content } = req.body;
  const { commentId } = req.param;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }
  if (content === undefined || content.trim() === "") {
    throw new ApiError(400, "Content is required for updating");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.comment?._id,
    {
      $set: { content },
    },
    { new: true }
  ).select("-owner -video");

  if (!getCommentUpdate) {
    throw new Error(400, "comment not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comment: updatedComment },
        "Comment updated successfully"
      )
    );
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment

  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  const getCommentDelete = await Comment.findByIdAndDelete(commentId);

  if (!getCommentDelete) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
