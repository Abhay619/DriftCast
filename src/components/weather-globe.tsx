import type { WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { useRef, useEffect } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { useTheme } from "@/context/theme-provider";

interface WeatherDataProps {
  data: WeatherData;
}

const WeatherGlobe = ({ data }: WeatherDataProps) => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  console.log(data);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: data.coord.lat, lng: data.coord.lon, altitude: 1.5 },
        1000
      );
    }
  }, [data.coord.lat, data.coord.lon]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  interface CityData {
  lat: number;
  lng: number;
  name: string;
  size: number;
}

const cityData: CityData[] = [
  {
    lat: data.coord.lat,
    lng: data.coord.lon,
    size: 1,
    name: data.name,
  },
];
  return (
    <Card className="shadow-xl dark:border-zinc-800 border-zinc-300">
      <CardContent className="rounded-t-2xl overflow-hidden flex justify-center items-center">
    <Globe
  ref={globeRef}
  width={800}
  height={400}
  globeImageUrl={
    isDark
      ? "//unpkg.com/three-globe/example/img/earth-dark.jpg"
      : "//unpkg.com/three-globe/example/img/earth-day.jpg"
  }
  backgroundColor="rgba(0,0,0,0)"
  pointsData={cityData}
  pointColor={() => "gray"}
  pointAltitude={0.05}
  labelsData={cityData}
  labelText="name"
  labelSize={1}
  labelDotRadius={0.4}
  labelColor={() => "#F0F0F0"}
  labelAltitude={0.06}
/>
      </CardContent>
    </Card>
  );
};

export default WeatherGlobe;
