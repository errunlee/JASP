import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { generateFormData } from '@/lib/generateFormData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';

import { IDonation, postDonation } from '../hooks/usePostDonation';
import Overlay from '@/components/Overlay';

const CreateDonation: React.FC = () => {
	const form = useForm<IDonation>({
		defaultValues: {
			name: '',
			details: '',
			location: '',
			category: 0,
			file: undefined
		}
	});

	const user = localStorage.getItem('user');
	let donatorId = '';
	if (user) {
		donatorId = JSON.parse(user).id;
	}
	const nav = useNavigate();
	const saveDonation: SubmitHandler<IDonation> = async (data) => {
		// debugger;
		const formData = generateFormData(data);
		await postDonation(formData);
		nav('/donations');
	};
	return (
		<div className="min-h-screen bg-background py-8 px-4">
			{form.formState.isSubmitting && <Overlay />}
			<h1 className="text-3xl font-bold text-center text-primary mb-6">
				Together, We Transform Waste into Hope
			</h1>
			<div className="max-w-4xl mx-auto bg-white text-black  p-6 rounded-lg shadow-lg border">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(saveDonation)}>
						<div className="space-y-4">
							<div>
								<Label htmlFor="itemName">Name</Label>
								<Input
									form={form}
									label=""
									name="name"
									id="Name"
									placeholder="Enter the name of the item"
								/>
							</div>
							<div>
								<Input
									type="hidden"
									form={form}
									label=""
									name="donatorId"
									value={donatorId}
									placeholder=""
								/>
							</div>

							<div>
								<Input
									id="location"
									placeholder="Enter the pickup location"
									form={form}
									label="Location"
									name="location"
								/>
							</div>
							<div>
								<Input
									id="details"
									placeholder="Enter a brief description of the item"
									form={form}
									label="Details"
									name="details"
								/>
							</div>

							{/* <Input
                form={form}
                label="Image"
                name="image"
                placeholder="Image"
                type="file"
              /> */}

							<input type="file" {...form.register('file')} />
						</div>

						{/* Buttons */}
						<div className="mt-6 flex justify-between">
							<Button type="submit">Donate</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default CreateDonation;
