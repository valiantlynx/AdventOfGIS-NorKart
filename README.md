# AdventOfGIS - with NorKart
## Challenge Description

Today, Santa is preparing for further planning, as Rudolf keeps pushing for snack breaks and the sleigh urgently needs reliable landing areas! To avoid certain areas, like major roads and forests, Santa needs more detailed map data on his "SleighPad." However, loading all spatial data as GeoJSON is too much, and it crashes the device. To make this map user-friendly and performant, a **background map** is essential for Santa's web map.

One popular approach in web mapping is to use **tile services**, specifically with the XYZ standard. These "tile caches" contain pre-rendered images organized by zoom levels, making it easy to create maps that handle large data. A common projection for web maps is **Web Mercator**, and the images are split by zoom level, creating billions of small tiles.

### Tile Types Explained

- **Raster Tiles** (image-based): These are pre-rendered images split by zoom level and available as small image files (PNG or JPG).
- **Vector Tiles** (data-based): These contain vector data that gets rendered directly by the web client, typically using the **MVT format**. This approach allows the client to control the rendering, resulting in a smoother experience without overloading the server.

Santa needs a **background map** in Leaflet, specifically with open XYZ map tile services, such as **Stamen tiles**.

## Steps to Implement the Background Map

### Adding Open XYZ Map Services

To help Santa get a reliable background map for his SleighPad, add the following open tile services from scratch in Leaflet:

1. **Toner** map: 
   ```
   https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png
   ```
2. **Terrain** map:
   ```
   https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg
   ```
3. **Watercolor** map:
   ```
   https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg
   ```

These URLs follow the XYZ format and automatically pull the appropriate map tiles based on the zoom level (`z`), and tile position (`x`, `y`).
