import React from "react";

interface StaticMapProps {
  encodedPolyline: string;
  origin: any;
  destination: any;
}

const StaticMap: React.FC<StaticMapProps> = ({ encodedPolyline, origin, destination }) => {
const GOOGLE_API_KEY = process.env['GOOGLE_API_KEY'] || ''; 
  const mapUrl = `//maps.googleapis.com/maps/api/staticmap?size=1920x1080&path=enc:${encodedPolyline}&markers=color:blue|label:O|${origin.latitude},${origin.longitude}&markers=color:red|label:F|${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`;

  return (
    <div>
      <img src={mapUrl} alt="Route Map" style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default StaticMap;