import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { farmerStats, totalFarmers } from "../../data/mockStats";
import { useLanguage } from "../../context/LanguageContext";

const GEO_URL =
  import.meta.env.VITE_MAP_GEO_URL ||
  "https://raw.githubusercontent.com/AbhinavSwami28/india-official-geojson/main/india-states.topojson";

const normalize = (value = "") =>
  value.toLowerCase().replace(/[^a-z]/g, "");

function getStateValue(name) {
  return getStateReport(name).farmers;
}

const fallbackConditions = [
  "Rainfed farming; seasonal water variation",
  "Mixed farming; moderate irrigation coverage",
  "Drought-prone pockets; water conservation focus",
  "Floodplain agriculture; seasonal flood exposure",
  "Hilly and forest-edge farming conditions",
  "Coastal agriculture; cyclone and salinity exposure"
];

function getStateReport(name) {
  const item = farmerStats.find(
    (state) => normalize(state.state) === normalize(name)
  );

  if (item) return item;

  const key = normalize(name) || "india";
  const hash = [...key].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const farmers = 12000 + (hash % 18) * 2100;

  return {
    state: name || "State",
    farmers,
    share: Number((farmers / totalFarmers * 100).toFixed(1)),
    condition: fallbackConditions[hash % fallbackConditions.length]
  };
}

function getFill(value) {
  if (!value) return "#e2e8f0";
  if (value < 30000) return "#c7e9d6";
  if (value < 70000) return "#8fd0ad";
  if (value < 110000) return "#4fa778";
  if (value < 150000) return "#16724a";
  return "#064e36";
}

export default function IndiaUsageMap() {
  const [hovered, setHovered] = useState(null);
  const { translate } = useLanguage();

  const active = hovered ? getStateReport(hovered) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
      <div className="gov-card overflow-hidden p-3">
        <div className="rounded-md bg-slate-50">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1100,
              center: [82.8, 22.5]
            }}
            width={800}
            height={520}
            className="h-auto w-full"
          >
            <ZoomableGroup center={[82.8, 22.5]} zoom={1}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName =
                      geo.properties?.ST_NM ||
                      geo.properties?.st_nm ||
                      geo.properties?.State_Name ||
                      geo.properties?.NAME_1 ||
                      geo.properties?.name ||
                      "Unknown";

                    const value = getStateValue(stateName);

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          setHovered(stateName);
                        }}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          default: {
                            fill: getFill(value),
                            stroke: "#ffffff",
                            strokeWidth: 0.65,
                            outline: "none"
                          },
                          hover: {
                            fill: "#0f8a5b",
                            stroke: "#ffffff",
                            strokeWidth: 1,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#064e36",
                            stroke: "#ffffff",
                            outline: "none"
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      <div className="gov-card p-6">
        <div className="gov-eyebrow">{translate("publicAnalytics")}</div>

        <div className="mt-2 text-3xl font-extrabold">
          {totalFarmers.toLocaleString("en-IN")}
        </div>

        <div className="text-sm text-slate-500">
          {translate("registered")}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <div className="text-sm font-bold">{translate("stateActivity")}</div>

          <div className="mt-3 space-y-3">
            {farmerStats.slice(0, 6).map((item) => (
              <div key={item.state}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{item.state}</span>
                  <span className="text-slate-500">
                    {item.farmers.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-emerald-700"
                    style={{
                      width: `${Math.max(item.share * 4, 5)}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
          {active ? <>
            <div className="font-bold">{active.state}</div>
            <div className="mt-1">{active.farmers.toLocaleString("en-IN")} {translate("farmerCount")} · {active.share}% {translate("share")}</div>
            <div className="mt-1">{active.condition}</div>
            <div className="mt-2 text-[11px] uppercase tracking-wide text-amber-800">{translate("condition")}</div>
          </> : translate("hoverHint")}
        </div>

        <div className="mt-5 border-t border-slate-200 pt-4">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{translate("legend")}</div>
          <div className="mt-2 h-2 rounded-full bg-linear-to-r from-emerald-100 via-emerald-500 to-emerald-950" />
          <div className="mt-1 flex justify-between text-[11px] text-slate-500"><span>{translate("low")}</span><span>{translate("high")}</span></div>
        </div>
      </div>
    </div>
  );
}
