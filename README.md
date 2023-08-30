# Intersect Console

Note - Made for GalaxEye Space Assessment

### Problem Description

A user comes to a console which has a base-map and an option to draw an AOI (Area of Interest). Upon selecting and area they will be presented with all the tiles (pre configured satellite image’s metadata) which are intersecting that AOI.

### Given Dataset

**Data details:** 100 tiles covering the whole state of Karnataka. A geojson file named `karnataka.geojson`

### Project Info

This is a geolocation category project by which we can draw a region,**which is called Area of our interest** on the map and based on a dataset which is given.

### Technologies used and How to build and start this project

The technologies which are used:

- Node - version 16
- React - version 18
- Vite - version 4
- react-leaflet - version 4.2.1

To start the project first clone it from github then, As the problem statement inclueded to add docker-compose setup, I have created the required `dockerfile` and `docker-compose.yaml` for this. So to test the code, go to the terminal run `docker-compose build` or `docker compose build` and it will automatically install all the required packages for us. After that run `docker-compose up` or `docker compose up` to run the server at `port: 3000`.

If you want to access the files inside docker then run `docker exec -it leaflet-app sh`

### Approach and Explanation

Approach I took is simple, no heavy design, no fancy things. Just a light themed fully responsive application with a white background, Heading and a Map container. Based on our AOI the interface will show us how many tiles have intersected.
![Alt text](image.png)

### How to use

As we can see on the above picture right corner there are 5 icons, the first 3 are for drawing a region. The three icons were for Polygon, Circle and Rectangle. We can use any one of them and draw a region.

![Alt text](image-1.png)
![Alt text](image-2.png)

As we can see when we mark a region which is in blue color, the red tiles are appearing which are intersecting tiles. Clicking on the blue mark will show us `Area of Interest` and clicking on the red mark will show us `This is a intersecting tile`

### Possible errors that could come

- One error could come related to vite and permission denied. We can delete our local node_modules if any then again run `docker-compose build` or `docker compose build` whatever and `docker compose up` or `docker-compose up`.
- Any other error could come if we have not setup docker properly to use it without sudo. Then you have to run the `docker compose` with `sudo`.
