import { useSelector, useDispatch } from "react-redux";
import { updateCountry } from "../../store/slices/mapDataSlice";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { getHexColor, getValue } from "../../utils/helpers";

const WorldMap = () => {
  const settings = useSelector((state) => state.mapData.settings);
  const data = useSelector(
    (state) => state.mapData.data[settings.sortBy][settings.orderBy]
  );
  const dispatch = useDispatch();
  return (
    <ComposableMap projection="geoEqualEarth" height={295}>
      <ZoomableGroup>
        <Geographies geography={"/data/countries-50m.json"}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const value = getValue(
                data.rawData,
                geo.properties.name,
                data.currDate,
                settings.filter
              );
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
                  style={{
                    default: {
                      fill: getHexColor(value),
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
