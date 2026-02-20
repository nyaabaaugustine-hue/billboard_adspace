// @ts-nocheck
"use client";

import { createPathComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const MarkerClusterGroup = createPathComponent(
  ({ children: _c, ...props }, ctx) => {
    const clusterProps = {};
    const clusterEvents = {};

    // Splitting props and events
    Object.entries(props).forEach(([propName, prop]) =>
      propName.startsWith("on")
        ? (clusterEvents[propName] = prop)
        : (clusterProps[propName] = prop)
    );

    const instance = L.markerClusterGroup(clusterProps);

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
      const event = `cluster${eventAsProp.substring(2).toLowerCase()}`;
      instance.on(event, callback);
    });

    return { instance, context: { ...ctx, layerContainer: instance } };
  }
);

export default MarkerClusterGroup;
