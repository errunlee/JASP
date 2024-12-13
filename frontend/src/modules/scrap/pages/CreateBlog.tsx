import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

interface BlogFormValues {
	blogTitle: string;
	blogAuthor: string;
	blogContent: string;
}

export default function CreateBlog() {
	const editorRef = useRef<any>(null);
	const [previewContent, setPreviewContent] = useState<BlogFormValues | null>(
		null
	);

	const form = useForm<BlogFormValues>({
		defaultValues: {
			blogTitle: '',
			blogAuthor: '',
			blogContent: ''
		}
	});

	const saveBlog: SubmitHandler<BlogFormValues> = (data) => {
		console.log('Blog Saved:', data);
		alert('Blog saved successfully!');
	};

	const previewBlog = () => {
		const content = editorRef.current?.getContent();
		const { blogTitle, blogAuthor } = form.watch();
		setPreviewContent({ blogTitle, blogAuthor, blogContent: content });
	};

	return (
		<div className="min-h-screen bg-background py-8 px-4">
			<h1 className="text-3xl font-bold text-center text-primary mb-6 ">
				What's on your mind?
			</h1>
			<div className="max-w-4xl mx-auto bg-white  p-6 rounded-lg shadow-lg border">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(saveBlog)}>
						<div className="space-y-4">
							{/* Blog Title */}
							<div>
								<Label htmlFor="blogTitle">Title</Label>
								<Input
									form={form}
									label=""
									name="blogTitle"
									id="blogTitle"
									placeholder="Enter the blog title"
								/>
							</div>

							{/* Author */}
							<div>
								<Label htmlFor="blogAuthor">Author</Label>
								<Input
									id="blogAuthor"
									placeholder="Enter the author name"
									form={form}
									label=""
									name="blogAuthor"
								/>
							</div>

							{/* Blog Content */}
							<div>
								<Label htmlFor="blogContent">Description</Label>
								<Editor
									apiKey="your-api-key"
									onInit={(_, editor) => (editorRef.current = editor)}
									onEditorChange={(content) =>
										form.setValue('blogContent', content)
									}
									initialValue="<p>Start writing your blog...</p>"
									init={{
										height: 500,
										menubar: true,
										plugins: [
											'advlist',
											'autolink',
											'lists',
											'link',
											'image',
											'charmap',
											'preview',
											'anchor',
											'searchreplace',
											'visualblocks',
											'code',
											'fullscreen',
											'insertdatetime',
											'media',
											'table',
											'help'
										],
										toolbar:
											'undo redo | blocks | bold italic | ' +
											'alignleft aligncenter alignright alignjustify | ' +
											'bullist numlist outdent indent | link image | preview',
										content_style:
											'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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
							<DialogTitle>{previewContent.blogTitle}</DialogTitle>
						</DialogHeader>
						<p className="text-sm text-gray-600 mb-4">
							By {previewContent.blogAuthor}
						</p>
						<div
							className="prose"
							dangerouslySetInnerHTML={{ __html: previewContent.blogContent }}
						/>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
