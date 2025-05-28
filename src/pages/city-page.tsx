import { useParams, useSearchParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import WeatherSkeleton from "@/components/loading-skeleton";
import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import FavoriteButton from "@/components/favorite-button";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0"); //getting latitude from paramerter
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="felx flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div>{/* Favorite Button */}
          <FavoriteButton data={{...weatherQuery.data, name: params.cityName}}/>
        </div>
      </div>

      {/* Current and Hourly Weather*/}
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* Current weather= */}
          <CurrentWeather data={weatherQuery.data} />

          {/* Hourly temp */}
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
