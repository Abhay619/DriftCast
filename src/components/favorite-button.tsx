import type { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}
const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addTofavorite, isFavorite, removeFavorites } = useFavorite();

  const isCurrentFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if(isCurrentFavorite){
        removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
        toast.error(`Removed ${data.name} from Favorites`);
    }
    else{
        addTofavorite.mutate({
            name: data.name,
            lat: data.coord.lat,
            lon: data.coord.lon,
            country: data.sys.country,
        });
        toast.success(`Added ${data.name} to Favorites`)
    }
  };

  return (
    <Button variant={isCurrentFavorite ? "default" : "outline"}
    size={"icon"}
    onClick={handleToggleFavorite}
    className={isCurrentFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}>
      <Star className={`h-4 w-4 ${isCurrentFavorite ? "fill-current" : ""}`} />
    </Button>
  );
};

export default FavoriteButton;
