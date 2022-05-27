import "./App.css";
import ohr from "./ohr.js";
import tubewells from "./json/tubewells.js";
import transmission_main from "./json/transmission_main.js";
import transmission_main2 from "./json/transmission_main2.js";
import collector_main from "./json/collector_main.js";
import avr from "./json/avr.js";
import below_off from "./json/below_off.js";
import bf from "./json/bf.js";
import flow_meter from "./json/flow_meter.js";
import mvalve from "./json/mvalve.js";
import pressure_guage from "./json/pressure_guage.js";
import prv from "./json/prv.js";
import saluce_valves from "./json/saluce_valves.js";
import dmz_boundaries from "./json/dmz_boundaries.js";
import { Prop } from "./prop";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import ReactDOM from "react-dom";
import Select from "react-select";
mapboxgl.accessToken =
  "pk.eyJ1IjoiemFmcmlpIiwiYSI6ImNrY3dpYTBtYTBlZm4zMHF1ZXdmaW9wYXAifQ.1aB3mpSztqNPZpmgchnbBA";

function App() {
  const mapContainer = useRef(null);
  const [lng] = useState(73.0897201);
  const [lat] = useState(31.4317641);
  const [zoom] = useState(12);
  const map = useRef(null);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    /* eslint-disable import/no-anonymous-default-export  */
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      // Add a new vector tile source with ID 'mapillary'.
      map.current.addSource("mapillary", {
        type: "vector",
        tiles: [
          `${process.env.REACT_APP_BACKEND_URL}tiles/pipelines?x={x}&y={y}&z={z}`,
        ],
        minzoom: 6,
        maxzoom: 14,
      });
      map.current.addLayer(
        {
          id: "mapillary", // Layer ID
          type: "line",
          source: "mapillary", // ID of the tile source created above
          // Source has several layers. We visualize the one with name 'sequence'.
          "source-layer": "pipelines",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-opacity": 0.6,
            "line-color": [
              "match",
              ["get", "class"],
              "ARTERIALMAIN",
              "#008000",
              "PRIMARY",
              "#000",
              "SECONDARY",
              "#f00",
              "#00f",
            ],
            "line-width": [
              "match",
              ["get", "class"],
              "ARTERIALMAIN",
              6,
              "PRIMARY",
              5,
              "SECONDARY",
              3,
              1,
            ],
          },
        },
        "road-label" // Arrange our new layer beneath this layer
      );

      map.current.addLayer({
        id: "pipelines-width",
        type: "symbol",
        source: "mapillary",
        "source-layer": "pipelines",
        layout: {
          "symbol-placement": "line-center",
          "text-field": ["format", ["get", "dia_inch"]],
          "text-size": 10,
          // "text-rotate": -4,
          "symbol-spacing": 1,
        },
        paint: {
          "text-translate": [0, -10],
          "text-halo-color": "rgba(255, 255, 255, 1)",
          "text-halo-blur": 0.5,
          "text-halo-width": 1,
          "text-color": "rgba(0, 0, 0, 1)",
        },
      });

      map.current.addSource("ohr", {
        type: "geojson",
        data: ohr,
      });
      map.current.addLayer({
        id: "ohr",
        type: "circle",
        source: "ohr",
        paint: {
          "circle-color": "#000",
          "circle-radius": 8,
        },
      });

      map.current.addLayer({
        id: "tubewells",
        type: "circle",
        source: {
          type: "geojson",
          data: tubewells,
        },
        paint: {
          "circle-color": "#f00",
          "circle-radius": 8,
        },
      });

      map.current.addLayer({
        id: "transmission_main",
        type: "line",
        source: {
          type: "geojson",
          data: transmission_main,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-opacity": 0.9,
          "line-color": "#000",
          "line-width": 4,
        },
      });

      map.current.addLayer({
        id: "transmission_main2",
        type: "line",
        source: {
          type: "geojson",
          data: transmission_main2,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-opacity": 0.9,
          "line-color": "#ff0",
          "line-width": 4,
        },
      });

      map.current.addLayer({
        id: "collector_main",
        type: "line",
        source: {
          type: "geojson",
          data: collector_main,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-opacity": 0.9,
          "line-color": "#ffa500",
          "line-width": 4,
        },
      });

      map.current.addLayer({
        id: "avr",
        type: "circle",
        source: {
          type: "geojson",
          data: avr,
        },
        paint: {
          "circle-color": "#A569BD",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "below_off",
        type: "circle",
        source: {
          type: "geojson",
          data: below_off,
        },
        paint: {
          "circle-color": "#5499C7",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "bf",
        type: "circle",
        source: {
          type: "geojson",
          data: bf,
        },
        paint: {
          "circle-color": "#48C9B0",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "flow_meter",
        type: "circle",
        source: {
          type: "geojson",
          data: flow_meter,
        },
        paint: {
          "circle-color": "#F4D03F",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "mvalve",
        type: "circle",
        source: {
          type: "geojson",
          data: mvalve,
        },
        paint: {
          "circle-color": "#9A7D0A",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "pressure_guage",
        type: "circle",
        source: {
          type: "geojson",
          data: pressure_guage,
        },
        paint: {
          "circle-color": "#E59866",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "prv",
        type: "circle",
        source: {
          type: "geojson",
          data: prv,
        },
        paint: {
          "circle-color": "#873600",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "saluce_valves",
        type: "circle",
        source: {
          type: "geojson",
          data: saluce_valves,
        },
        paint: {
          "circle-color": "#566573",
          "circle-radius": 4,
        },
      });

      map.current.addLayer({
        id: "ohr-label",
        type: "symbol",
        source: "ohr",
        minzoom: 13, // Set zoom level to whatever suits your needs
        layout: {
          "text-field": ["get", "Name"],
          "text-size": 14,
          "text-offset": [0, 2],
        },
        paint: {
          "text-halo-color": "rgba(0, 0, 0, 1)",
          "text-halo-blur": 1,
          "text-halo-width": 1.5,
          "text-color": "rgba(255, 255, 255, 1)",
        },
      });

      map.current.addLayer({
        id: "dmz_boundaries",
        type: "line",
        source: {
          type: "geojson",
          data: dmz_boundaries,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-opacity": 0.7,
          "line-color": "#000",
          "line-width": 4,
        },
      });

      map.current.on("click", () => {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "none";
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render([], tooltipNode);
      });

      map.current.on("click", "ohr", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("click", "tubewells", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("click", "mapillary", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      // change cursor to pointer when user hovers over a clickable feature
      map.current.on("mouseenter", "mapillary", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map.current.on("mouseleave", "mapillary", () => {
        map.current.getCanvas().style.cursor = "";
      });

      // change cursor to pointer when user hovers over a clickable feature
      map.current.on("mouseenter", "ohr", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map.current.on("mouseleave", "ohr", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("mouseenter", "tubewells", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "tubewells", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("mouseenter", "avr", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "avr", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "avr", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("mouseenter", "below_off", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "below_off", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "below_off", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("mouseenter", "bf", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "bf", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "bf", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("mouseenter", "flow_meter", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "flow_meter", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "flow_meter", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("mouseenter", "mvalve", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "mvalve", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "mvalve", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("mouseenter", "pressure_guage", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "pressure_guage", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "pressure_guage", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("mouseenter", "prv", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "prv", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "prv", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });

      map.current.on("mouseenter", "saluce_valves", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "saluce_valves", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "saluce_valves", function (e) {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "block";
        const object = e.features[0].properties;
        let arr = [];
        for (const property in object) {
          console.log(`${property}: ${object[property]}`);
          arr.push(<Prop title={property} value={object[property]} />);
        }
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render(arr, tooltipNode);
      });
    });
  });

  function selectOnChange(event) {
    console.log(event.value);
    map.current.flyTo({ center: [event.value[0], event.value[1]], zoom: 16 });
  }

  const options = [];
  for (let i = 0; i < ohr.features.length; i++) {
    options.push({
      value: ohr.features[i].geometry.coordinates,
      label: ohr.features[i].properties.Name,
    });
  }

  const MyComponent = () => (
    <Select options={options} onChange={selectOnChange} />
  );

  const hideNav = () => {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
  };

  const openNav = () => {
    document.getElementsByClassName("sidebar")[0].style.display = "block";
  };

  useEffect(() => {
    // if (!map.current) return; // wait for map to initialize
    // map.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });
  });

  return (
    <div className='App'>
      <div className='openNav'>
        <button className='openbtn' onClick={openNav}>
          ☰
        </button>
      </div>
      <div className='sidebar'>
        {/* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
        <div className='navParent'>
          <button className='openbtn' onClick={hideNav}>
            ☰
          </button>
        </div>
        <h3>Water Network</h3>
        <div className='legendBody'>
          <div className='legendItem'>
            <p>Pipelines</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color green'></span>
                <span>Artrial</span>
              </div>
              <div className='legendFinal'>
                <span className='color red'></span>
                <span>Secondary</span>
              </div>
              <div className='legendFinal'>
                <span className='color blue'></span>
                <span>Tertiary</span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>OHR</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color black circle'></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <h3>Water Resources</h3>
        <div className='legendBody'>
          <div className='legendItem'>
            <p>Tubewells</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color red circle'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>Transmission Main</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color black line'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>Transmission Main 2</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color yellow line'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>Collector Main</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color orange line'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>DMZ Boundaries</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color black line'></span>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <h3>Valves</h3>
        <div className='legendBody'>
          <div className='legendItem'>
            <p>AVR</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color A569BD circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>BelowOFF</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c5499C7 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>BF</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c48C9B0 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>Flow Meter</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color cF4D03F circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>MValve</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c9A7D0A circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>Pressure Guage</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color cE59866 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>PRV</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c873600 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <p>Saluce Valves</p>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c566573 circle small'></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='searchDiv'>
        <div className='searchDiv_child'>
          <MyComponent></MyComponent>
        </div>
      </div>
      <div className='layerProperties'>
        <h3>Details</h3>
        <div className='layerProperties_body' id='layerProperties_body'></div>
      </div>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
}

export default App;
