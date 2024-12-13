import { RouteObject } from "react-router-dom";

import Campaign from "./pages/CreateCampaign";
import AllCampaigns from "./pages/AllCampaigns";
import CampaignDetail from "./components/CampaignDetailPage";

export const CampaignRoutes: RouteObject[] = [
  {
    path: "create",
    element: <Campaign />,
  },
  {
    path: "",
    element: <AllCampaigns />,
  },
  {
    path: "campaign/:id",
    element: <CampaignDetail />,
  },
];
