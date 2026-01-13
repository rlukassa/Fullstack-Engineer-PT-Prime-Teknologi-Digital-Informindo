import express from 'express';
const router = express.Router(); 
import { __createPost__, __getAllPosts__, __getPostById__, __updatePost__, __deletePost__, __getMyPosts__, __getPostsbyTitle__, __toggleLike__, __toggleBookmark__, __getBookmarks__ } from '../controllers/postController';
import { getCommentsByPostId, createComment, updateComment, deleteComment } from '../controllers/commentController';
import { getNotifications, markAsRead, markAllAsRead, getUnreadCount } from '../controllers/notificationController';

// Notification routes - must be before other dynamic routes
router.get('/notifications/:userId', getNotifications);
router.get('/notifications/:userId/unread-count', getUnreadCount);
router.put('/notifications/:id/read', markAsRead);
router.put('/notifications/:userId/read-all', markAllAsRead);

// Post routes - specific routes BEFORE dynamic :id routes
router.post('/posts', __createPost__);
router.get('/posts', __getAllPosts__);
router.get('/posts/user/:authorId', __getMyPosts__);
router.get('/posts/search/:title', __getPostsbyTitle__);

// Like and Bookmark routes - MUST be before /posts/:id
router.post('/posts/:id/like', __toggleLike__);
router.post('/posts/:id/bookmark', __toggleBookmark__);
router.get('/bookmarks/:userId', __getBookmarks__);

// Dynamic :id routes AFTER specific routes
router.get('/posts/:id', __getPostById__);
router.put('/posts/:id', __updatePost__);
router.delete('/posts/:id', __deletePost__);

// Comment routes
router.get('/posts/:postId/comments', getCommentsByPostId);
router.post('/posts/:postId/comments', createComment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

export default router; 

