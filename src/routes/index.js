const express = require("express");

const router = express.Router();

//import middleware
const { auth } = require('../middleware/auth')

//import authorization
const {
  register, login
} = require("../controllers/auth");

//import users
const {
  getUsers, editUser, deleteUser
} =require('../controllers/users')

//import follow
const { getFollowers, getFollowing } = require('../controllers/follows');
const { addFeed, getFollowedFeed, getFeeds } = require("../controllers/feeds");

//import comments
const { getComments, addComment } = require('../controllers/comments')

//import message
const { addMessage, getMessageUser } = require('../controllers/messages')

//route auth
router.post("/register", register)
router.post("/login", login)

//route user
router.get("/users", auth, getUsers)
router.patch("/user/:id", editUser)
router.delete("/user/:id", deleteUser)

//route follows
router.get("/followers/:id", getFollowers)
router.get("/following/:id", getFollowing)

//route feeds
router.post("/feed", auth, addFeed)
router.get("/feed/:id", auth, getFollowedFeed)
router.get("/feeds", getFeeds)

//route comments
router.get("/comments/:id", auth, getComments)
router.post("/comment", auth, addComment)

//route messages
router.post("/message/:id", auth, addMessage)
router.get("/message-user/:id", auth, getMessageUser)

module.exports = router;