import React from "react";
import VehicleLocation from "../components/VehicleLocation";

type Props = {};

const Vehicle = (props: Props) => {
  return (
    <div className="h-screen">
      <VehicleLocation />
    </div>
  );
};

export default Vehicle;
