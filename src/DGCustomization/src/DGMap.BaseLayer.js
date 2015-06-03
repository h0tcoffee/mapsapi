DG.Map.addInitHook(function () {
    var errorUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX28t5R0k5UAAAAH0lEQVR4Xu3AAQkAAADCMPunNsdhWxwAAAAAAAAAwAEhAAABg2UP5AAAAABJRU5ErkJggg==';
    var errorRuUrl = DG.config.protocol + DG.config.baseUrl + '/img/nomap_ru.png';

    var BaseLayer = DG.TileLayer.extend({
        initialize: function (url, options) {
            this._isDg = true;
            DG.TileLayer.prototype.initialize.call(this, url, options);
        }
    });

    this.baseLayer = new BaseLayer(DG.config.protocol + DG.config.tileServer, {
        subdomains: '0123',
        errorTileUrl: this.getLang() === 'ru' ? errorRuUrl : errorUrl,
        detectRetina: DG.config.detectRetina,
        maxZoom: 19,
        maxNativeZoom: 19
    }).addTo(this);

    this.on('langchange', function (ev) {
        if (ev.lang === 'ru') {
            this.baseLayer.options.errorTileUrl = errorRuUrl;
        } else {
            this.baseLayer.options.errorTileUrl = errorUrl;
        }
    });
});
