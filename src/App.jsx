// import MapView from "./Components/MapView";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import IntersectContextProvider from "./IntersectContext";
import { Fragment, lazy, Suspense } from "react";
import { useIntersections } from "./hooks/useIntersections";
import Loader from "./Components/Loader";

const Mapview = lazy(() => import("./Components/MapView"));

function App() {
  return (
    <div className="container">
      <IntersectContextProvider>
        <Home />
      </IntersectContextProvider>
    </div>
  );
}

const Home = () => {
  const { intersections } = useIntersections();
  return (
    <Fragment>
      <h1 className="container__header">Intersect console</h1>
      <div className="container__important__note">
        <h4>Note</h4>
        <p className="container__about">
          This map will show you the intersecting tiles for your area of
          interest based on the dataset that is provided. On the right corner
          there are three types of drawing techniques, you can choose any of
          them. Upon marking your aoi, the intersecting tiles will show in red
          colour. (Dataset provided was 100 tiles near Karnataka, Hyderabad)
        </p>
      </div>
      {intersections ? (
        intersections.length > 0 ? (
          <span className="container__tiles__count__info">
            {`You have total of ${intersections.length} intersecting tiles for
            your area of interest`}
          </span>
        ) : (
          <span className="container__tiles__count__info">
            You have zero intersecting tiles
          </span>
        )
      ) : (
        <span data-info="initial">Draw your area of interest</span>
      )}
      <div className="mapview__container">
        <Suspense
          fallback={
            <Loader
              customStyle={{
                marginTop: "23px",
              }}
            />
          }
        >
          <Mapview />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
