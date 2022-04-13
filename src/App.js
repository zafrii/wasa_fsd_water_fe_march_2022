import "./App.css";
import ohr from "./ohr.js";
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
  var map = new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [lng, lat],
    zoom: zoom,
  });
  useEffect(() => {
    // if (map.current) return; // initialize map only once

    map.on("load", () => {
      // Add a new vector tile source with ID 'mapillary'.
      map.addSource("mapillary", {
        type: "vector",
        tiles: [
          `${process.env.REACT_APP_BACKEND_URL}tiles/pipelines?x={x}&y={y}&z={z}`,
        ],
        minzoom: 6,
        maxzoom: 14,
      });
      map.addLayer(
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

      map.addLayer({
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

      map.addSource("ohr", {
        type: "geojson",
        data: ohr,
      });
      map.addLayer({
        id: "ohr",
        type: "circle",
        source: "ohr",
        paint: {
          "circle-color": "#000",
          "circle-radius": 8,
        },
      });

      map.addLayer({
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

      map.on("click", () => {
        document.getElementsByClassName("layerProperties")[0].style.display =
          "none";
        const tooltipNode = document.getElementById("layerProperties_body");
        ReactDOM.render([], tooltipNode);
      });

      map.on("click", "ohr", function (e) {
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

      map.on("click", "mapillary", function (e) {
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
      map.on("mouseenter", "mapillary", (e) => {
        if (e.features.length) {
          map.getCanvas().style.cursor = "pointer";
        }
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map.on("mouseleave", "mapillary", () => {
        map.getCanvas().style.cursor = "";
      });

      // change cursor to pointer when user hovers over a clickable feature
      map.on("mouseenter", "ohr", (e) => {
        if (e.features.length) {
          map.getCanvas().style.cursor = "pointer";
        }
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map.on("mouseleave", "ohr", () => {
        map.getCanvas().style.cursor = "";
      });
    });
  });

  function selectOnChange(event) {
    console.log(event.value);
    map.flyTo({ center: [event.value[0], event.value[1]], zoom: 16 });
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
        <h3>Table of Contents</h3>
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
