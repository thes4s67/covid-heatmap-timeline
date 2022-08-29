import { useSelector, useDispatch } from "react-redux";
import { updateCountry } from "../../store/slices/mapDataSlice";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { getHexColor,getValue } from "../../utils/helpers";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const WorldMap = () => {
  const data = useSelector((state) => state.mapData.data.rawData);
  const settings = useSelector((state) => state.mapData.settings);
  const dispatch = useDispatch();
  return (
    <ComposableMap projection="geoEqualEarth" height={295}>
      <ZoomableGroup>
        <Geographies geography={"/data/countries-50m.json"}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const value = getValue(data, geo.properties.name, settings.rawDate)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    dispatch(updateCountry(geo.properties.name));
                  }}
                  onMouseLeave={() => {
                    // dispatch(updateCountry(""));
                  }}
                  // fill={geo.id === "818" ? "#782618" : "#FFF"}
                  style={{
                    default: {
                      fill: getHexColor(value, geo.properties.name),
                      outline: "none",
                    },
                    hover: {
                      fill: "#201e1e",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
export default WorldMap;
