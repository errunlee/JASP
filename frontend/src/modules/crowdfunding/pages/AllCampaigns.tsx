import SingleCampaign from "../components/SingleCampaign";
import campaigns from "../campaignsData";

const AllCampaigns = () => {
  return (
    <div className="container mx-auto bg-background">
      <section className="grid md:grid-cols-3 gap-3">
        {campaigns.map((item, index) => (
          <SingleCampaign campaign={item} key={index} />
        ))}
      </section>
    </div>
  );
};

export default AllCampaigns;
