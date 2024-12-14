import { useState } from 'react';
import EsewaPaymentForm from './EsewaPayment';

const CampaignDetail = () => {
	// Placeholder campaign data
	const campaign = {
		title: 'Save the Earth Campaign',
		targetAmount: 100000, // Target amount for the campaign
		collectedAmount: 65000, // Amount already collected
		targetMembers: 150, // Target number of participants
		currentMembers: 120 // Current number of participants
	};

	const [donationAmount, setDonationAmount] = useState<number>(0);
	const [isJoined, setIsJoined] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Handle donation amount input
	const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const amount = Number(e.target.value);

		// Validate that the donation cannot exceed the target amount minus the collected amount
		if (amount > campaign.targetAmount - campaign.collectedAmount) {
			setErrorMessage(
				`Donation cannot exceed the remaining target amount of $${(
					campaign.targetAmount - campaign.collectedAmount
				).toLocaleString()}.`
			);
		} else {
			setErrorMessage(null); // Clear the error if valid
		}

		setDonationAmount(amount);
	};

	// Handle join campaign
	const handleJoinCampaign = () => {
		setIsJoined(true);
		alert('You have joined the campaign!');
	};

	// Progress percentage
	const progress = (campaign.collectedAmount / campaign.targetAmount) * 100;

	return (
		<div className="container mx-auto p-8 max-w-3xl rounded-xl bg-white shadow-lg dark:bg-gray-900">
			<h1 className="text-4xl font-roboto font-semibold text-center text-green-600 mb-6">
				{campaign.title}
			</h1>

			<div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
				{/* Campaign Details */}
				<div className="space-y-4 mb-8">
					<div className="flex justify-between text-lg">
						<p className="font-medium">
							<strong>Target Amount:</strong> $
							{campaign.targetAmount.toLocaleString()}
						</p>
						<p className="font-medium">
							<strong>Amount Collected:</strong> $
							{campaign.collectedAmount.toLocaleString()}
						</p>
					</div>
					<div className="flex justify-between text-lg">
						<p className="font-medium">
							<strong>Target Members:</strong> {campaign.targetMembers}
						</p>
						<p className="font-medium">
							<strong>Current Members:</strong> {campaign.currentMembers}
						</p>
					</div>
				</div>

				{/* Progress Bar */}
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Progress</h2>
					<div className="relative pt-1">
						<div className="flex mb-2 items-center justify-between">
							<div>
								<span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
									{campaign.collectedAmount.toLocaleString()} of{' '}
									{campaign.targetAmount.toLocaleString()} collected
								</span>
							</div>
							<div>
								<span className="text-sm font-semibold text-green-600 dark:text-green-400">
									{progress.toFixed(2)}%
								</span>
							</div>
						</div>
						<div className="flex mb-2">
							<div
								className="w-full h-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded-full"
								style={{ backgroundColor: 'rgb(243, 244, 246)' }}
							>
								<div
									className="h-2 rounded-full bg-green-500"
									style={{ width: `${progress}%` }}
								></div>
							</div>
						</div>
					</div>
				</div>

				{/* Donation Section */}
				<div className="mb-6">
					<h2 className="text-2xl font-medium mb-4">Make a Donation</h2>
					<div className="flex items-center space-x-4">
						<input
							type="number"
							className="w-full p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter your donation amount"
							value={donationAmount}
							onChange={handleDonationChange}
						/>
						<EsewaPaymentForm
							errorMessage={errorMessage}
							price={donationAmount}
						/>
					</div>
					{/* Display error message if validation fails */}
					{errorMessage && (
						<p className="text-red-600 text-sm mt-2">{errorMessage}</p>
					)}
				</div>

				{/* Join Campaign Section */}
				<div>
					<h2 className="text-2xl font-medium mb-4">Join the Campaign</h2>
					<p className="font-parkinsans mb-4 text-gray-600 dark:text-slate-200">
						Help us make a difference! If you want to join the campaign and
						contribute to the cause, click the button below and join us.
					</p>
					<div className="flex items-center space-x-4">
						{!isJoined ? (
							<button
								onClick={handleJoinCampaign}
								className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
							>
								Join this Campaign
							</button>
						) : (
							<p className="text-green-600 font-semibold">
								You are already part of the campaign!
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CampaignDetail;
