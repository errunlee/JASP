import axios from 'axios';

export type Blog = {
    id: number;
    authorId: number;
    title: string;
    description: string;
    content: string;
    tags: string[];
    createdAt: string;
    modifiedAt: string;
    createdBy: string;
    modifiedBy: string;
    image?: string;
  };

const endpoint = "https://2fjd62r4-3000.inc1.devtunnels.ms/api";

export const getBlogs = async (): Promise<Blog[]> => {
    try {
        const response = await axios.get<Blog[]>(`${endpoint}/blogs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

export const postBlog = async (newBlog: Blog): Promise<Blog> => {
    try {
        const response = await axios.post<Blog>(`${endpoint}/blogs`, newBlog);
        return response.data;
    } catch (error) {
        console.error('Error posting new blog:', error);
        throw error;
    }
};


export const getBlogById = async (id: string): Promise<Blog> => {
    try {
        const response = await axios.get<Blog>(`${endpoint}/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog with id ${id}:`, error);
        throw error;
    }
};

export const deleteBlogById = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${endpoint}/blogs/${id}`);
    } catch (error) {
        console.error(`Error deleting blog with id ${id}:`, error);
        throw error;
    }
};

export const editBlogById = async (id: string, updatedBlog: Partial<Blog>): Promise<Blog> => {
    try {
        const response = await axios.put<Blog>(`${endpoint}/blogs/${id}`, updatedBlog);
        return response.data;
    } catch (error) {
        console.error(`Error editing blog with id ${id}:`, error);
        throw error;
    }
};