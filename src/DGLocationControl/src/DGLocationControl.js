/*
Copyright (c) 2013 Dominik Moritz

This file is part of the leaflet locate control. It is licensed under the MIT license.
You can find the project at: https://github.com/domoritz/leaflet-locatecontrol
*/
L.DG.LocationControl = L.Control.extend({

    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topleft',
        drawCircle: true,
        follow: false,  // follow with zoom and pan the user's location
        stopFollowingOnDrag: false, // if follow is true, stop following when map is dragged
        metric: true,
        onLocationError: function (err) {
            // this event is called in case of any location error
            // that is not a time out error.
            console.log(err.message);
        },
        onLocationOutsideMapBounds: function (context) {
            // this event is repeatedly called when the location changes
            console.log(context.t('outsideMapBoundsMsg'));
        },
        locateOptions: {}
    },

    _addPreloaders: function () {
        var map = L.DomUtil.get('map');
        this._loader = L.DomUtil.create('div', 'dg-loader', map);
        this._loaderLocate = L.DomUtil.create('div', 'dg-loader-locate', map);
        this._loaderLocateError = L.DomUtil.create('div', 'dg-loader-locate-error', map);
        this._loaderLocateError.innerHTML = this.t('cant_find');
    },
    _showLoad: function () {
        this._loader.style.display = 'block';
        this._loaderLocate.style.display = 'block';
        this._loaderLocateError.style.display = 'none';
    },
    _showLoadError: function () {
        this._loader.style.display = 'none';
        this._loaderLocate.style.display = 'block';
        this._loaderLocateError.style.display = 'block';
    },
    _hideLoad: function () {
        this._loader.style.display = 'none';
        this._loaderLocate.style.display = 'none';
        this._loaderLocateError.style.display = 'none';
    },

    onAdd: function (map) {
        if (!navigator.geolocation)
            return;
        this._addPreloaders();

        var container = L.DomUtil.create('div', 'leaflet-control-locate leaflet-bar');

        var self = this;
        this._layer = new L.LayerGroup();
        this._layer.addTo(map);
        this._event = undefined;

        this._locateOptions = {
            watch: true  // if you overwrite this, visualization cannot be updated
        };
        L.extend(this._locateOptions, this.options.locateOptions);
        L.extend(this._locateOptions, {
            setView: false // have to set this to false because we have to
                           // do setView manually
        });

        var link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', container);
        link.href = '#';
        link.title = this.t('button_title');

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', function () {
                self._showLoad();
                if (self._active && self._event && (map.getBounds().contains(self._event.latlng) ||
                    isOutsideMapBounds())) {
                    stopLocate();
                } else {
                    self._locateOnNextLocationFound = true;

                    if (!self._active) {
                        map.locate(self._locateOptions);
                    }

                    self._active = true;

                    if (self.options.follow) {
                        startFollowing();
                    }

                    if (self._event) {
                        visualizeLocation();
                    }
                }
            })
            .on(link, 'dblclick', L.DomEvent.stopPropagation);

        var onLocationFound = function (e) {
            self._hideLoad();
            // no need to do anything if the location has not changed
            if (self._event &&
                (self._event.latlng.lat === e.latlng.lat &&
                 self._event.latlng.lng === e.latlng.lng &&
                 self._event.accuracy === e.accuracy)) {
                return;
            }

            if (!self._active) {
                return;
            }

            self._event = e;

            if (self.options.follow && self._following) {
                self._locateOnNextLocationFound = true;
            }

            visualizeLocation();
        };

        var startFollowing = function () {
            self._following = true;
            if (self.options.stopFollowingOnDrag) {
                map.on('dragstart', stopFollowing);
            }
        };

        var stopFollowing = function () {
            self._following = false;
            if (self.options.stopFollowingOnDrag) {
                map.off('dragstart', stopFollowing);
            }
            visualizeLocation();
        };

        var isOutsideMapBounds = function () {
            if (self._event === undefined) {
                return false;
            }
            return map.options.maxBounds &&
                !map.options.maxBounds.contains(self._event.latlng);
        };

        var visualizeLocation = function () {
            if (self._event.accuracy === undefined) {
                self._event.accuracy = 0;
            }

            var radius = self._event.accuracy;
            if (self._locateOnNextLocationFound) {
                if (isOutsideMapBounds()) {
                    self.options.onLocationOutsideMapBounds(self);
                } else {
                    map.fitBounds(self._event.bounds);
                }
                self._locateOnNextLocationFound = false;
            }

            // circle with the radius of the location's accuracy
            var style = {
                color: '#FFF',
                fillColor: '#FFF',
                fillOpacity: 0.4,
                weight: 0,
                opacity: 0.3
            };
            if (self.options.drawCircle) {
                if (!self._circle) {
                    self._circle = L.circle(self._event.latlng, radius, style)
                        .addTo(self._layer);
                } else {
                    self._circle.setLatLng(self._event.latlng).setRadius(radius);
                }
            }

            var distance, unit;
            if (self.options.metric) {
                distance = radius.toFixed(0);
                unit = 'meters';
            } else {
                distance = (radius * 3.2808399).toFixed(0);
                unit = 'feet';
            }

            // small inner marker
            var m = {
                icon: L.divIcon({
                    className: 'dg-locate-pin',
                    iconSize: [20, 20]
                })
            };

            if (!self._marker) {
                self._marker = L.marker(self._event.latlng, m)
                    .bindLabel(self.t('you_are_here'))
                    .addTo(self._layer);
            } else {
                self._marker.setLatLng(self._event.latlng);
            }

            L.DomEvent.on(self._marker, 'click', function () {
                map.fireEvent('dgLocateClick');
            });

            if (!self._container) {
                return;
            }
        };

        var resetVariables = function () {
            self._active = false;
            self._following = false;
        };

        resetVariables();

        var stopLocate = function () {
            map.stopLocate();
            map.off('dragstart', stopFollowing);

            resetVariables();

            self._layer.clearLayers();
            self._marker = undefined;
            self._circle = undefined;
        };

        var onLocationError = function (err) {
            // ignore time out error if the location is watched
            if (err.code === 3 && this._locateOptions.watch) {
                return;
            }

            stopLocate();
            self._showLoadError();
            setTimeout(function () {
                self._hideLoad();
            }, 3000);
            self.options.onLocationError(err);
        };

        // event hooks
        map.on('locationfound', onLocationFound, self);
        map.on('locationerror', onLocationError, self);

        return container;
    }
});

L.Map.addInitHook(function () {
    if (this.options.locateControl) {
        this.locateControl = L.DG.locate();
        this.addControl(this.locateControl);
    }
});

L.DG.locate = function (options) {
    return new L.DG.LocationControl(options);
};