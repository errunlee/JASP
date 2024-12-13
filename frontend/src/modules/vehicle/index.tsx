import { RouteObject } from "react-router-dom";

import VehicleLocation from "./pages/Vehicle";

export const VehiclesRoutes: RouteObject[] = [
  {
    path: "",
    element: <VehicleLocation />,
  },
];
