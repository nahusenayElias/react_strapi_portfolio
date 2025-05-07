const renderURL = import.meta.env.VITE_RENDER_URL;

const API_URL = `${renderURL}/api`;

// Fetch all blogs from Strapi
export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_URL}/blogs?populate=*`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] }; // Return empty array on failure
  }
};

// Update blog reaction (like/dislike)
export const updateBlogReaction = async (blogId, type, currentValue) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          [type]: currentValue + 1, // Manually increment since $inc is not supported
        }
      }),
    });

    if (!response.ok) throw new Error(`Failed to update ${type}`);
    return await response.json();
  } catch (error) {
    console.error("Reaction error:", error);
    return null; // Indicate failure
  }
};

// Add a new comment to a blog post
export const addComment = async (blogId, commentText, existingComments) => {
  try {
    const updatedComments = [...existingComments, { text: commentText, createdAt: new Date().toISOString() }];

    const response = await fetch(`${API_URL}/blogs/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { comments: updatedComments },
      }),
    });

    if (!response.ok) throw new Error('Failed to add comment');
    return await response.json();
  } catch (error) {
    console.error("Comment error:", error);
    return null; // Indicate failure
  }
};
