import { api } from "@/lib/instance";
import { toast } from "@/lib/toast";
import { AxiosError } from "axios";

export interface IBlogs {
  authorId: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  file: FileList;
}

const postBlogs = async (data: FormData) => {
  try {
    await api.post<IBlogs>("/api/blog/", data);
    toast.success("Blog posted successfully!");
  } catch (err) {
    if (err instanceof AxiosError) {
      toast.error(err.response?.data.message);
    } else {
      toast.error("Failed to post blog");
    }
  }
};
export const usePostBlogs = (data: FormData) => {
  return postBlogs(data);
};
