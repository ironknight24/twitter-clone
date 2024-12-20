import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, likeUnlikePost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/all', protectRoute, getAllPosts);
router.get('/following', protectRoute,getFollowingPosts);
router.get('/likes/:id', protectRoute, getLikedPosts);
router.post('/create', protectRoute, createPost);
router.delete('/:id', protectRoute, deletePost);
router.get('/like/:id', protectRoute, likeUnlikePost);
router.post('/comment/:id', protectRoute, commentOnPost);


export default router;