import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist
  if (!(name || description)) {
    throw new Error(400, "No playlist found");
  }

  const newPlaylist = await Playlist.create(req.playlist._id, {});

  if (!newPlaylist) {
    throw new ApiError(400, "playlist was not created");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { playlist: newPlaylist },
        "Playlist created successfully"
      )
    );
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!userId) {
    throw new ApiError(400, "User Id is required");
  }

  const playlist = await Playlist.findById(
    req.playlist?._id,
    {
      $set: { playlist },
    },
    { new: true }
  );

  if (!playlist) {
    throw new ApiError(400, "No playlist found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { playlist: playlist },
        "Playlists fetched successfully"
      )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  if (!playlistId) {
    throw new ApiError(400, "Playlist Id is required");
  }

  const getPlaylistDeleted = await Playlist.findByIdAndDelete(playlistId);

  if (!getPlaylistDeleted) {
    throw new Error("Playlist deleteion failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
