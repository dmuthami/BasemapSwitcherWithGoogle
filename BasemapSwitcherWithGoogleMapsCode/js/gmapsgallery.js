/// <reference path="gmapsgallery.js" />
            dojo.require("dijit.layout.BorderContainer");
            dojo.require("dijit.layout.ContentPane");
            dojo.require("esri.map");
            dojo.require("esri.virtualearth.VETiledLayer");
            dojo.require("dijit.TitlePane");
            dojo.require("esri.dijit.BasemapGallery");
            dojo.require("esri.arcgis.utils");
            dojo.require("agsjs.layers.GoogleMapsLayer");
            dojo.require("esri.layers.agsdynamic");
            
            var map = null;
            
            //Extensts here are for the town of Otjiwarongo
            function init() {
              var initExtent = new esri.geometry.Extent({
                 "xmin": 1850215.5974132873,
                 "ymin": -2330534.8678123984,
                 "xmax": 1859388.0408077498,
                 "ymax": -2325857.8771440755,
                "spatialReference": {
                  "wkid": 102100
                }
              });

             //New map object
              map = new esri.Map("map", {
                extent: initExtent
              });

             //Call create new basemap widget that includes Google Basemaps
              createBasemapGallery();

              //Add operational layer. Commented out due to errors
              //addLayer();
            }
            
            function createBasemapGallery() {
              //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
              var basemapGallery = new esri.dijit.BasemapGallery({
                showArcGISBasemaps: true,
                toggleReference: true,
                google: {
                  apiOptions: {
                    v: '3.6' // use a specific version is recommended for production system.
                  }
                },
                map: map
              }, "basemapGallery");
              basemapGallery.startup();
              
              //wire event to error handler
              dojo.connect(basemapGallery, "onError", function(msg) {
                if (console) console.log(msg)
              });
            }

            //Add Layer
            function addLayer() {
                //url for the layer
                var url = "http://localhost:6080/arcgis/rest/services/Otjiwarongo/MapServer";

                //create  parcel fabric object
                var layer = new esri.layers.ArcGISDynamicMapServiceLayer(url, {
                    id: "Otjiwarongo",
                    opacity: 0.5
                });

                //Add layer to object
                map.addLayer(layer);
            }
            
            dojo.addOnLoad(init);