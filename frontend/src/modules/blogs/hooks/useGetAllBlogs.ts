import { api } from "@/lib/instance";
import { toast } from "@/lib/toast";

const endPoint = "/api/blog?limit=50";

export const getAllBlogs = async () => {
  try {
    const response = await api.get(endPoint);
    return response.data.data;
  } catch {
    toast.error("Failed to get blogs");
    return [];
  }
};

// export const useGetAllBLogs = (): BlogResponse[] => {
//   const [blogs, setBlogs] = useState<BlogResponse[]>([]);
//   const [error, setError] = useState<null | Error>(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const data = await getAll();
//         setBlogs(data);
//       } catch (error) {
//         setError(error as Error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (error) {
//     console.error(error.message);
//   }

//   return blogs;
// };
