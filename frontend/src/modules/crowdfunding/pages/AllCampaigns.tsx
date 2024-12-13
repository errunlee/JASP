import SingleCampaign from "../components/SingleCampaign";

type Props = {};

const AllCampaigns = ({}: Props) => {
  const data = new Array(5).fill(0);
  return (
    <div className="container mx-auto bg-background">
      <section className="grid md:grid-cols-3 gap-3">
        {data.map((item, index) => (
          <SingleCampaign campaign={item} key={index} />
        ))}
      </section>
    </div>
  );
};

export default AllCampaigns;
