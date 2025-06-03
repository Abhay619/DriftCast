import type { WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { useTheme } from "@/context/theme-provider";

interface WeatherDataProps {
  data: WeatherData;
}

const WeatherGlobe = ({ data }: WeatherDataProps) => {
  const globeRef = useRef();
  console.log(data.coord.lat);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: data.coord.lat, lng: data.coord.lon, altitude: 1.5 },
        1000
      );
    }
  }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
          pointsData={[{ lat: data.coord.lat, lng: data.coord.lon, size: 1 }]}
          pointColor={() => "gray"} // Tailwind violet-500
          pointAltitude={0.05}
        />
      </CardContent>
    </Card>
  );
};

export default WeatherGlobe;
