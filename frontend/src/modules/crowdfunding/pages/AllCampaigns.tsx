import SingleCampaign from '../components/SingleCampaign';
import campaigns from '../campaignsData';
import { useState } from 'react';

const AllCampaigns = () => {
	const [causes, setCauses] = useState(campaigns);
	return (
		<div className="container mx-auto bg-background">
			<section className="grid md:grid-cols-3 gap-3">
				{causes.map((item, index) => (
					<SingleCampaign campaign={item} key={index} />
				))}
			</section>
		</div>
	);
};

export default AllCampaigns;
