const blogsRouter = require('express').Router();
const { requireUser } = require('./utils');

const {
    getAllBlogs,
    getBlogByUserId,
    getBlogByMerchId,
    getBlogByBlogId,
    createBlog,
    updateBlog,
    deleteBlog,
} = require('../db');

blogsRouter.use((req, res, next) => {
    console.log('A request is being made to /blogs');
    next();
});


blogsRouter.get('/', async (req, res, next) => {
    console.log('Entered get all blogs route...');

    const blogs = await getAllBlogs();

    res.send({
        message: 'Successfully retrieved all blogs.',
        blogs
    })
});

blogsRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    console.log("UserId: ", userId);

    try {
        const userBlogs = await getBlogByUserId(userId);

        if (userBlogs) {
            res.send({
                message: 'Successfully retrieved user blogs.',
                userBlogs
            });
            console.log("User Blogs: ", userBlogs);
        } else {
            next({
                name: "BlogRetrievalError",
                message: "Error retrieving user blogs."
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});


blogsRouter.get('/merch/:merchId', async (req, res, next) => {

    const { merchId } = req.params;

    try {
        const blogs = await getBlogByMerchId(merchId);

        if (blogs) {
            res.send({
                message: 'Successfully retrieved blog by merchId',
                blogs
            })
        } else {
            next({
                error: 'FailedToRetrieveBlogError',
                message: `Unable to retrieve blog by merchId: ${merchId} `
            })
        }
    } catch ({ error, message }) {
        next({ error, message })
    }
});

// blogRouter.get('/', async (req, res, next) => {
//     const { blogId } = req.params;

//     try {
//         const blog = await getBlogByCategoryId(catId);

//         if (blog) {
//             res.send({
//                 message: 'Successfully retrieved blog',
//                 blog
//             })
//         } else {
//             next({
//                 error: 'FailedToRetrieveBlogError',
//                 message: `Unable to retrieve blog by id:${catId} `
//             })
//         }
//     } catch ({ error, message }) {
//         next({ error, message })
//     }
// });

blogsRouter.patch('/:blogId', requireUser, async (req, res, next) => {
    const { blogId } = req.params;
    const { title, blogText, authorId } = req.body;
    const user = req.user;

    if (user && user.user_id === authorId) {
        try {
            const blog = getBlogByBlogId(blogId);
            if (blog) {
                const updatedBlog = await updateBlog(blogId, {
                    title,
                    blogText
                });
                res.send({
                    message: 'You have successfully updated your blog entry.',
                    updatedBlog,
                    status: true
                });
                console.log("Update blog: ", updatedBlog);
            } else {
                next({
                    name: "BlogUpdateError",
                    message: "You cannot update a blog that is not yours."
                })
            };
        } catch ({ error, message }) {
            next({ error, message });
        };
    }
});

blogsRouter.post('/', requireUser, async (req, res, next) => {
    const user = req.user;

    const {
        merchId,
        title,
        blogText,
        authorId } = req.body;

    if (user) {
        try {
            const blog = await createBlog({
                merchId,
                title,
                blogText,
                authorId
            });

            if (blog) {
                res.send({
                    message: 'Successfully created new blog',
                    blog,
                    status: true
                });

            } else {
                next({
                    error: 'CreateNewBlogError',
                    message: 'Error creating new blog'
                });
            }

        } catch ({ error, message }) {
            next({ error, message });
        };
    }
});

blogsRouter.delete('/:blogId', requireUser, async (req, res, next) => {
    const { blogId } = req.params;
    console.log('Delete route BlogId: ', blogId);
    const user = req.user;
    console.log('Delete route user', user)

    try {
        const blog = await getBlogByBlogId(blogId);
        console.log('Blog: ', blog);
        const { authorId } = blog;
        console.log("AUTHORID:", authorId)

        if (blog && user.user_id === authorId) {
            console.log('In the first if statement!!')
            const deletedBlog = await deleteBlog(blogId);

            res.send({
                message: `Successfully deleted blog: ${blogId}`,
                deletedBlog,
                status: true
            })
        } else {
            next({
                error: 'FailedToDeleteBlogError',
                message: 'Unable to delete blog'
            })
        }

    } catch ({ error, message }) {
        next({ error, message });
    };
});

module.exports = blogsRouter;