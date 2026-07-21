// Google's Geocoding REST API and the Places JS SDK both return address
// components as { long_name, short_name, types }[]. This adapts that shape
// into the street/streetNumber/city/state/country fields ReportDialog manages.
const findComponent = (components, type) =>
  components?.find((component) => component.types.includes(type))?.long_name || "";

export function adaptGoogleAddressComponents(components) {
  return {
    street: findComponent(components, "route"),
    streetNumber: findComponent(components, "street_number"),
    city:
      findComponent(components, "locality") ||
      findComponent(components, "administrative_area_level_2"),
    state: findComponent(components, "administrative_area_level_1"),
    country: findComponent(components, "country"),
  };
}
