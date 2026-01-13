import { pool } from '../config/db';
import { Request, Response } from 'express';
import { createNotification } from './notificationController';

export const __createPost__ = async (req: Request, res: Response): Promise<void> => { 
    try { 
        const { title, caption, image, authorId } = req.body;
        
        if (!title || !caption || !authorId) {
            res.status(400).json({ message: 'Title, caption, and authorId are required.' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO posts (title, caption, image, author_id, likes, is_edited, created_at) 
             VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) 
             RETURNING *`,
            [title, caption, image || null, authorId, 0, false]
        );

        res.status(201).json({ message: 'Post created successfully', post: result.rows[0] });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const __getAllPosts__ = async (req: Request, res: Response): Promise<void> => { 
    try {
        // Pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        
        // Search parameter
        const search = (req.query.search as string || '').trim();
        
        // Current user for like/bookmark status
        const currentUserId = req.query.userId as string || null;
        
        let query = `
            SELECT 
                p.id AS _id,
                p.title,
                p.caption,
                p.image,
                p.likes,
                p.is_edited AS "isEdited",
                p.created_at AS "createdAt",
                p.updated_at AS "updatedAt",
                JSON_BUILD_OBJECT('_id', u.id, 'username', u.username) AS author,
                (SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id) AS comments,
                ${currentUserId ? `EXISTS(SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = ${parseInt(currentUserId)})` : 'FALSE'} AS "isLiked",
                ${currentUserId ? `EXISTS(SELECT 1 FROM bookmarks b WHERE b.post_id = p.id AND b.user_id = ${parseInt(currentUserId)})` : 'FALSE'} AS "isBookmarked"
             FROM posts p
             LEFT JOIN users u ON p.author_id = u.id
        `;
        
        let countQuery = `SELECT COUNT(*)::int as total FROM posts p`;
        const queryParams: any[] = [];
        const countParams: any[] = [];
        
        // Add fuzzy search filter using trigram similarity + ILIKE fallback
        if (search.length > 0) {
            // Use combination of ILIKE for partial match and similarity for fuzzy match
            query += ` WHERE (
                p.title ILIKE $1 OR 
                p.caption ILIKE $1 OR
                SIMILARITY(LOWER(p.title), LOWER($2)) > 0.1 OR
                SIMILARITY(LOWER(p.caption), LOWER($2)) > 0.1
            )`;
            countQuery += ` WHERE (
                p.title ILIKE $1 OR 
                p.caption ILIKE $1 OR
                SIMILARITY(LOWER(p.title), LOWER($2)) > 0.1 OR
                SIMILARITY(LOWER(p.caption), LOWER($2)) > 0.1
            )`;
            queryParams.push(`%${search}%`, search);
            countParams.push(`%${search}%`, search);
            
            // Order by relevance when searching
            query += ` ORDER BY 
                GREATEST(
                    SIMILARITY(LOWER(p.title), LOWER($2)),
                    SIMILARITY(LOWER(p.caption), LOWER($2))
                ) DESC,
                p.created_at DESC
            `;
            query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
        } else {
            query += ` ORDER BY p.created_at DESC LIMIT $1 OFFSET $2`;
        }
        
        queryParams.push(limit, offset);
        
        const result = await pool.query(query, queryParams);
        const countResult = await pool.query(countQuery, countParams);
        
        const total = countResult.rows[0]?.total || 0;
        const totalPages = Math.ceil(total / limit) || 1;

        res.status(200).json({ 
            posts: result.rows,
            pagination: {
                currentPage: page,
                totalPages,
                totalPosts: total,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Get all posts error:', error);
        res.status(500).json({ message: 'getPosts Error', error });
    }
};

export const __getPostById__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(
            `SELECT 
                p.id AS _id,
                p.title,
                p.caption,
                p.image,
                p.likes,
                p.is_edited AS "isEdited",
                p.created_at AS "createdAt",
                p.updated_at AS "updatedAt",
                JSON_BUILD_OBJECT('_id', u.id, 'username', u.username) AS author,
                (SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id) AS comments
             FROM posts p
             LEFT JOIN users u ON p.author_id = u.id
             WHERE p.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        res.status(200).json({ post: result.rows[0] });
    } catch (error) {
        console.error('Get post by id error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const __updatePost__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, caption, image, authorId } = req.body;

        // Check if post exists and user is author
        const postCheck = await pool.query('SELECT author_id FROM posts WHERE id = $1', [id]);
        
        if (postCheck.rows.length === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        if (postCheck.rows[0].author_id !== parseInt(authorId)) {
            res.status(403).json({ message: 'Not authorized to edit this post' });
            return;
        }

        const result = await pool.query(
            `UPDATE posts 
             SET title = $1, caption = $2, image = $3, is_edited = true, updated_at = CURRENT_TIMESTAMP
             WHERE id = $4
             RETURNING *`,
            [title, caption, image || null, id]
        );

        res.status(200).json({ message: 'Post updated successfully', post: result.rows[0] });
    } catch (error) {
        console.error('Update post error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const __deletePost__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const authorId = req.body.authorId || req.query.authorId;

        // Check if post exists and user is author
        const postCheck = await pool.query('SELECT author_id FROM posts WHERE id = $1', [id]);
        
        if (postCheck.rows.length === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        if (postCheck.rows[0].author_id !== parseInt(authorId)) {
            res.status(403).json({ message: 'Not authorized to delete this post' });
            return;
        }

        // Delete comments first (foreign key constraint)
        await pool.query('DELETE FROM comments WHERE post_id = $1', [id]);
        
        // Delete post
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const __getMyPosts__ = async (req: Request, res: Response): Promise<void> => {
    try { 
        const { authorId } = req.params;
        
        const result = await pool.query(
            `SELECT 
                p.id AS _id,
                p.title,
                p.caption,
                p.image,
                p.likes,
                p.is_edited AS "isEdited",
                p.created_at AS "createdAt",
                p.updated_at AS "updatedAt",
                JSON_BUILD_OBJECT('_id', u.id, 'username', u.username) AS author,
                (SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id) AS comments
             FROM posts p
             LEFT JOIN users u ON p.author_id = u.id
             WHERE p.author_id = $1
             ORDER BY p.created_at DESC`,
            [authorId]
        );

        res.status(200).json({ posts: result.rows });
    } catch (error) {
        console.error('Get my posts error:', error);
        res.status(500).json({ message: 'getMyPosts Error', error });
    }
}; 

export const __getPostsbyTitle__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.params;
        
        const result = await pool.query(
            `SELECT 
                p.id AS _id,
                p.title,
                p.caption,
                p.image,
                p.likes,
                p.is_edited AS "isEdited",
                p.created_at AS "createdAt",
                p.updated_at AS "updatedAt",
                JSON_BUILD_OBJECT('_id', u.id, 'username', u.username) AS author,
                (SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id) AS comments
             FROM posts p
             LEFT JOIN users u ON p.author_id = u.id
             WHERE p.title ILIKE $1
             ORDER BY p.created_at DESC`,
            [`%${title}%`]
        );

        res.status(200).json({ posts: result.rows });
    }
    catch (error) {
        console.error('Get posts by title error:', error);
        res.status(500).json({ message: 'getPostsbyTitle Error', error });
    } 
};

// Toggle like on a post
export const __toggleLike__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ message: 'userId is required' });
            return;
        }

        // Check if already liked
        const existingLike = await pool.query(
            'SELECT id FROM post_likes WHERE post_id = $1 AND user_id = $2',
            [id, userId]
        );

        let isLiked: boolean;
        let likesCount: number;

        if (existingLike.rows.length > 0) {
            // Unlike - remove the like
            await pool.query(
                'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2',
                [id, userId]
            );
            // Decrease likes count
            await pool.query(
                'UPDATE posts SET likes = GREATEST(likes - 1, 0) WHERE id = $1',
                [id]
            );
            isLiked = false;
        } else {
            // Like - add new like
            await pool.query(
                'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2)',
                [id, userId]
            );
            // Increase likes count
            await pool.query(
                'UPDATE posts SET likes = likes + 1 WHERE id = $1',
                [id]
            );
            isLiked = true;

            // Create notification for post author
            const postResult = await pool.query('SELECT author_id FROM posts WHERE id = $1', [id]);
            if (postResult.rows.length > 0) {
                await createNotification(postResult.rows[0].author_id, parseInt(userId), parseInt(id as string), 'like');
            }
        }

        // Get updated likes count
        const result = await pool.query('SELECT likes FROM posts WHERE id = $1', [id]);
        likesCount = result.rows[0]?.likes || 0;

        res.status(200).json({ 
            message: isLiked ? 'Post liked' : 'Post unliked',
            isLiked,
            likes: likesCount
        });
    } catch (error) {
        console.error('Toggle like error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Toggle bookmark on a post
export const __toggleBookmark__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ message: 'userId is required' });
            return;
        }

        // Check if already bookmarked
        const existingBookmark = await pool.query(
            'SELECT id FROM bookmarks WHERE post_id = $1 AND user_id = $2',
            [id, userId]
        );

        let isBookmarked: boolean;

        if (existingBookmark.rows.length > 0) {
            // Remove bookmark
            await pool.query(
                'DELETE FROM bookmarks WHERE post_id = $1 AND user_id = $2',
                [id, userId]
            );
            isBookmarked = false;
        } else {
            // Add bookmark
            await pool.query(
                'INSERT INTO bookmarks (post_id, user_id) VALUES ($1, $2)',
                [id, userId]
            );
            isBookmarked = true;

            // Create notification for post author
            const postResult = await pool.query('SELECT author_id FROM posts WHERE id = $1', [id]);
            if (postResult.rows.length > 0) {
                await createNotification(postResult.rows[0].author_id, parseInt(userId), parseInt(id as string), 'bookmark');
            }
        }

        res.status(200).json({ 
            message: isBookmarked ? 'Post bookmarked' : 'Bookmark removed',
            isBookmarked
        });
    } catch (error) {
        console.error('Toggle bookmark error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get user's bookmarked posts
export const __getBookmarks__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            `SELECT 
                p.id AS _id,
                p.title,
                p.caption,
                p.image,
                p.likes,
                p.is_edited AS "isEdited",
                p.created_at AS "createdAt",
                p.updated_at AS "updatedAt",
                JSON_BUILD_OBJECT('_id', u.id, 'username', u.username) AS author,
                (SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id) AS comments,
                TRUE AS "isBookmarked",
                EXISTS(SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = $1) AS "isLiked"
             FROM posts p
             LEFT JOIN users u ON p.author_id = u.id
             INNER JOIN bookmarks b ON b.post_id = p.id AND b.user_id = $1
             ORDER BY b.created_at DESC`,
            [userId]
        );

        res.status(200).json({ posts: result.rows });
    } catch (error) {
        console.error('Get bookmarks error:', error);
        res.status(500).json({ message: 'getBookmarks Error', error });
    }
};