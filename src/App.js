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
import dmz_boundaries_point from "./json/dmz_boundaries_point.js";
import sarfaraz_colony from "./json/sarfaraz_colony.js";
import sarfaraz_colony_water_meter from "./json/sarfaraz_colony_water_meter.js";
import sarfaraz_colony_red_pump from "./json/sarfaraz_colony_red_pump.js";
import madina_town from "./json/madina_town.js";
import madina_town_sucking_pump from "./json/madina_town_sucking_pump.js";
import madina_town_water_connection from "./json/madina_town_water_connection.js";
import madina_town_water_meter from "./json/madina_town_water_meter.js";
import batala_colony from "./json/batala_colony.js";
import pc1 from "./json/pc1.js";
import { Prop } from "./prop";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import ReactDOM from "react-dom";
import Select from "react-select";
import { Checkbox } from "./checkbox.js";
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

      map.current.addLayer({
        id: "sarfaraz_colony",
        type: "fill",
        source: {
          type: "geojson",
          data: sarfaraz_colony,
        },
        paint: {
          "fill-opacity": 0.5,
          "fill-color": "#000",
        },
      });

      map.current.addLayer({
        id: "sarfaraz_colony_water_meter",
        type: "circle",
        source: {
          type: "geojson",
          data: sarfaraz_colony_water_meter,
        },
        paint: {
          "circle-color": "#00ff00",
          "circle-radius": 3,
        },
      });

      map.current.addLayer({
        id: "sarfaraz_colony_red_pump",
        type: "circle",
        source: {
          type: "geojson",
          data: sarfaraz_colony_red_pump,
        },
        paint: {
          "circle-color": "#ff0000",
          "circle-radius": 3,
        },
      });

      map.current.addLayer({
        id: "madina_town",
        type: "fill",
        source: {
          type: "geojson",
          data: madina_town,
        },
        paint: {
          "fill-opacity": 0.5,
          "fill-color": "#000",
        },
      });

      map.current.addLayer({
        id: "madina_town_water_meter",
        type: "circle",
        source: {
          type: "geojson",
          data: madina_town_water_meter,
        },
        paint: {
          "circle-color": "#00ff00",
          "circle-radius": 3,
        },
      });

      map.current.addLayer({
        id: "madina_town_sucking_pump",
        type: "circle",
        source: {
          type: "geojson",
          data: madina_town_sucking_pump,
        },
        paint: {
          "circle-color": "#ff0000",
          "circle-radius": 3,
        },
      });

      map.current.addLayer({
        id: "madina_town_water_connection",
        type: "line",
        source: {
          type: "geojson",
          data: madina_town_water_connection,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-opacity": 0.7,
          "line-color": "#ff0000",
          "line-width": 3,
        },
      });

      map.current.addLayer({
        id: "dmz_boundaries_label",
        type: "symbol",
        source: {
          type: "geojson",
          data: dmz_boundaries_point,
        },
        layout: {
          "symbol-placement": "point",
          "text-field": ["format", ["get", "name"]],
          "text-size": 20,
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

      map.current.addLayer({
        id: "batala_colony",
        type: "fill",
        source: {
          type: "geojson",
          data: batala_colony,
        },
        paint: {
          "fill-opacity": 0.5,
          "fill-color": "#000",
        },
      });

      map.current.addLayer({
        id: "pc1",
        type: "fill",
        source: {
          type: "geojson",
          data: pc1,
        },
        paint: {
          "fill-opacity": 0.5,
          "fill-color": "#000",
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

      map.current.on("mouseenter", "sarfaraz_colony", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "sarfaraz_colony", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "sarfaraz_colony", function (e) {
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

      map.current.on("mouseenter", "sarfaraz_colony_water_meter", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "sarfaraz_colony_water_meter", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "sarfaraz_colony_water_meter", function (e) {
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

      map.current.on("mouseenter", "sarfaraz_colony_red_pump", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "sarfaraz_colony_red_pump", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "sarfaraz_colony_red_pump", function (e) {
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

      map.current.on("mouseenter", "madina_town", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "madina_town", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "madina_town", function (e) {
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

      map.current.on("mouseenter", "madina_town_sucking_pump", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "madina_town_sucking_pump", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "madina_town_sucking_pump", function (e) {
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

      map.current.on("mouseenter", "madina_town_water_connection", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "madina_town_water_connection", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "madina_town_water_connection", function (e) {
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

      map.current.on("mouseenter", "madina_town_water_meter", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "madina_town_water_meter", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "madina_town_water_meter", function (e) {
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

      map.current.on("mouseenter", "batala_colony", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "batala_colony", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "batala_colony", function (e) {
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

      map.current.on("mouseenter", "pc1", (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });
      map.current.on("mouseleave", "pc1", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "pc1", function (e) {
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

  function changeVisibility(layer, checked) {
    if (layer === "dmz_boundaries") {
      changeVisibility("dmz_boundaries_label", checked);
    }
    if (layer === "mapillary") {
      changeVisibility("pipelines-width", checked);
    }
    const visibility = checked === true ? "visible" : "none";
    map.current.setLayoutProperty(layer, "visibility", visibility);
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
            <div className='legendItemTitle'>
              <Checkbox
                layer='mapillary'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Pipelines</p>
            </div>
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
            <div className='legendItemTitle'>
              <Checkbox
                layer='ohr'
                changeVisibility={changeVisibility}></Checkbox>
              <p>OHR</p>
            </div>
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
            <div className='legendItemTitle'>
              <Checkbox
                layer='tubewells'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Tubewells</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color red circle'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='transmission_main'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Transmission Main</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color black line'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='transmission_main2'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Transmission Main 2</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color yellow line'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='collector_main'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Collector Main</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color orange line'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='dmz_boundaries'
                changeVisibility={changeVisibility}></Checkbox>
              <p>DMZ Boundaries</p>
            </div>
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
            <div className='legendItemTitle'>
              <Checkbox
                layer='avr'
                changeVisibility={changeVisibility}></Checkbox>
              <p>AVR</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color A569BD circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='below_off'
                changeVisibility={changeVisibility}></Checkbox>
              <p>BelowOFF</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c5499C7 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='bf'
                changeVisibility={changeVisibility}></Checkbox>
              <p>BF</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c48C9B0 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='flow_meter'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Flow Meter</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color cF4D03F circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='mvalve'
                changeVisibility={changeVisibility}></Checkbox>
              <p>MValve</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c9A7D0A circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='pressure_guage'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Pressure Guage</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color cE59866 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='prv'
                changeVisibility={changeVisibility}></Checkbox>
              <p>PRV</p>
            </div>
            <div className='legendItems_detail'>
              <div className='legendFinal'>
                <span className='color c873600 circle small'></span>
              </div>
            </div>
          </div>
          <div className='legendItem'>
            <div className='legendItemTitle'>
              <Checkbox
                layer='saluce_valves'
                changeVisibility={changeVisibility}></Checkbox>
              <p>Saluce Valves</p>
            </div>
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
