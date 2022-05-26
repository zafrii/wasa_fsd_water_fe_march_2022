const below_off = {
  type: "FeatureCollection",
  name: "belowOff",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: {
        Id: 0,
        Size: '16"',
        Location:
          "Jail Road. In front of Hazrat Data Ali Hajveery Repairing Centre",
        Status: null,
      },
      geometry: {
        type: "Point",
        coordinates: [73.080858919563113, 31.445446275796524],
      },
    },
    {
      type: "Feature",
      properties: {
        Id: 0,
        Size: '16"',
        Location: "Allied Mor, Wasa chowk",
        Status: "hidden, Can't be seen anything",
      },
      geometry: {
        type: "Point",
        coordinates: [73.08019368839841, 31.446839211513321],
      },
    },
  ],
};
export default below_off;
