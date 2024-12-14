import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { usePostBlogs, IBlogs } from "../hooks/usePostBlogs";
import { generateFormData } from "@/lib/generateFormData";
import Overlay from "@/components/Overlay";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const editorRef = useRef<any>(null);
  const [previewContent, setPreviewContent] = useState<Partial<IBlogs> | null>(
    null
  );

  const user = localStorage.getItem("user");
  let authorId = "";
  if (user) {
    authorId = JSON.parse(user).id;
  }

  const form = useForm<IBlogs>({
    defaultValues: {
      authorId: authorId,
      title: "",
      description: "",
      content: "",
      tags: ["environment"],
      file: undefined,
    },
  });

  const nav = useNavigate();
  const saveBlog: SubmitHandler<IBlogs> = async (data) => {
    const formData = generateFormData(data);
    if (editorRef.current) {
      data.content = editorRef.current.getContent();
    }
    await usePostBlogs(formData);
    nav("/blogs");
  };

  const previewBlog = () => {
    const content = editorRef.current?.getContent();
    const { authorId, title, description } = form.getValues();
    setPreviewContent({
      authorId,
      title,
      description,
      content: content || "",
      tags: [],
      file: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {form.formState.isSubmitting && <Overlay />}
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        What's on your mind?
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveBlog)}>
            <div className="space-y-4">
              {/* Blog Title */}
              {/* Blog Title */}
              <div>
                <Label htmlFor="blogTitle">Title</Label>
                <Input
                  form={form}
                  label=""
                  name="title"
                  id="title"
                  placeholder="Enter the blog title"
                />
              </div>

              {/* Author */}
              {/* <div>
                <Label htmlFor="authorId">Author ID</Label>
                <Input
                  id="authorId"
                  placeholder="Enter the author ID"
                  form={form}
				  label="Author"
				  name="authorId"
                />
              </div> */}

              {/* Blog Description */}
              <div>
                <Input
                  id="description"
                  placeholder="Enter a brief description"
                  form={form}
                  label="Description"
                  name="description"
                />
              </div>

              {/* <Input
                form={form}
                label="Image"
                name="image"
                placeholder="Image"
                type="file"
              /> */}

              <input type="file" {...form.register("file")} />
              {/* Blog Content */}
              <div>
                <Label htmlFor="content">Content</Label>
                <Editor
                  apiKey="hiyi55219jowbez4et4l15xk73k2wh14bdeio77aave8j5k5"
                  onInit={(_, editor) => (editorRef.current = editor)}
                  onEditorChange={(content) =>
                    form.setValue("content", content)
                  }
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                    ],
                    toolbar:
                      "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image preview",
                    content_style:
                      "body { font-family:Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <Button type="button" onClick={previewBlog}>
                Preview
              </Button>
              <Button type="submit">Share</Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Preview Modal */}
      {previewContent && (
        <Dialog
          open={!!previewContent}
          onOpenChange={() => setPreviewContent(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{previewContent.title}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600 mb-4">
              By {previewContent.authorId}
            </p>
            <p className="text-sm text-gray-800 mb-4">
              {previewContent.description}
            </p>
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: previewContent.content || "N/A",
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
