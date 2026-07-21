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

let mapsScriptPromise = null;

// Loads the Google Maps JS SDK (places library) once and caches the promise,
// so multiple callers (e.g. re-mounted dialogs) share the same script tag.
export function loadGoogleMapsScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();
  if (mapsScriptPromise) return mapsScriptPromise;

  mapsScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-google-maps-script]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("No se pudo cargar Google Maps")));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.dataset.googleMapsScript = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.body.appendChild(script);
  });

  return mapsScriptPromise;
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


