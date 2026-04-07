import { usePlacesWidget } from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";


export function useGooglePLaces(apiKey) {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesWidget({
    apiKey: apiKey,
  });

  const getPlaceDetails = (placeId, callback) => {
    if(!placesService)return;
    placesService.getPlaceDetails({ placeId },callback)
  }

  return {
    placesService,
    placePredictions,
    getPlacePredictions,
    getPlaceDetails,
    isPlacePredictionsLoading,
  };
}

export async function reverseGeocode(lat,lng) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}`
  );

  const data = await response.json();

  if(data.status === "OK"){
    return data.results[0];
  }else{
    throw new Error("No se pudo acceder a la api");
  }
  
}


