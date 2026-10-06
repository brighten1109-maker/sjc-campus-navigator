# SJC Campus Navigator — Live API Integration

This version adds live geographic data to the existing SJC Campus Navigator.

## APIs used

### 1. Leaflet + OpenStreetMap
- Leaflet renders the interactive map in the browser.
- OpenStreetMap supplies the real street/map tiles.
- No API key is required for the Leaflet library.

### 2. Open-Meteo
- Current campus temperature
- Weather condition
- Relative humidity
- Wind speed
- Precipitation
- Automatically refreshes every 10 minutes
- No API key is required for this demo/non-commercial use.

### 3. Valhalla / OpenStreetMap routing
- Real pedestrian/road-network routing
- Distance and estimated walking time
- Route geometry displayed directly on the Leaflet map
- Uses the public Valhalla demo endpoint for this academic project.

## SJC coordinates

The map is centered on St. Joseph's College, Tiruchirappalli at approximately:

- Latitude: `10.8297`
- Longitude: `78.6922`

The college's published/commonly indexed coordinates are around 10.83 N, 78.691–78.692 E.

## Important campus-location note

The original project contains an illustrated campus map whose building positions are stored as SVG `x/y` coordinates. The live-map integration converts those existing positions into approximate geographic anchors so that the API features work immediately.

For production-level indoor/campus navigation, replace those approximate coordinates with surveyed GPS coordinates for each gate, block, library, department, etc. The public street map cannot know private/internal campus paths that are not mapped in OpenStreetMap.

## Moodle Module 2

This implementation demonstrates external API usage through:

`Leaflet + OpenStreetMap + Open-Meteo + Valhalla`

The website dynamically fetches real data instead of using hard-coded weather or route values.
