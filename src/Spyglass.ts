import * as azmaps from "azure-maps-control";
import { SpyglassOptions } from './SpyglassOptions';

 /** A control that provides a window into a data set inside of a spy glass on the map. */
export class Spyglass {
     /****************************
     * Private Properties
     ***************************/

    private _primaryMap: azmaps.Map;
    private _spyMap: azmaps.Map;
    private _options: SpyglassOptions = {
        borderColor: '#555555',
        borderWidth: 5,
        opacity: 1,
        shape: 'circle',
        size: 350
    };
    private _syncEvents: any[] = [];
    private _maps: azmaps.Map[] = [];

    /****************************
    * Constructor
    ***************************/

    /**
     * A control that provides a window into a data set inside of a spy glass on the map.
     * @param primaryMap The primary map the spy glass will be overlaid on top of.
     * @param spyMap The map to be used as the spy glass.
     * @param options The options for the control
     */
    constructor(primaryMap: azmaps.Map, spyMap: azmaps.Map, options?: SpyglassOptions) {
        const self = this;
        self._primaryMap = primaryMap;
        self._spyMap = spyMap;

        const container = <HTMLDivElement>self._spyMap.getMapContainer();
        container.style.position = 'absolute';

        self._spyMap.events.add('ready', () => {
            (<HTMLDivElement>container.getElementsByClassName('azure-map-logo')[0]).style.display = 'none';
            (<HTMLDivElement>container.getElementsByClassName('map-copyright')[0]).style.display = 'none';
        });

        self.setOptions(self._options);

        if (options) {
            self.setOptions(options);
        }

        self._maps = [self._primaryMap, self._spyMap];

        //Bind sync events and synchronize the map views.
        self._maps.forEach((map, index) => {
            self._syncEvents[index] = self._synchronizeMaps.bind(self, map);
        });

        //Sync all map views with the first map.
        self._syncEvents[0]();

        //Attach the map move handler.
        self._attachMapMoveHandlers();
    }

    /****************************
     * Public Methods
     ***************************/

    /** Dispose the control and clean up its resources. */
    public dispose(): void {
        const self = this;
        self._detachMapMoveHandlers();

        self._options = null;

        self._spyMap = null;
        self._primaryMap = null;
    }

    /** Gets the options of the Spyglass control. */
    public getOptions(): SpyglassOptions {
        return this._options;
    }

    /**
     * Sets the options of the spyglass control.
     * @param options The options to set.
     */
    public setOptions(options: SpyglassOptions): void {
        const spyMap = this._spyMap;
        const spyMapStyle = (<HTMLDivElement>spyMap.getCanvasContainer()).style;
        const containerStyle = spyMap.getMapContainer().style;
        const opt = this._options;

        if (typeof options.shape === 'string' && (options.shape === 'circle' || options.shape === 'square')) {
            if (options.shape === 'circle') {
                containerStyle.borderRadius = '50%';
                spyMapStyle.borderRadius = '50%';
            } else {
                containerStyle.borderRadius = '0';
                spyMapStyle.borderRadius = '0';
            }

            opt.shape = options.shape;
        }

        if (typeof options.borderWidth === 'number') {
            options.borderWidth = Math.max(options.borderWidth, 0);

            containerStyle.borderStyle = 'solid';
            containerStyle.borderWidth = options.borderWidth + 'px';
            opt.borderWidth = options.borderWidth;
        }

        if (typeof options.borderColor === 'string') {
            containerStyle.borderColor = options.borderColor;
            opt.borderColor = options.borderColor;
        }
        
        if (typeof options.opacity === 'number') {
            options.opacity = Math.max(Math.min(options.opacity, 1), 0);

            spyMapStyle.opacity = options.opacity + '';
            opt.opacity = options.opacity;
        }

        if (typeof options.size === 'number') {
            options.size = Math.max(options.size, 1);

            const offset = (options.size) / 2 + opt.borderWidth;

            containerStyle.left = 'calc(50% - ' + offset + 'px)';
            containerStyle.top = 'calc(50% - ' + offset + 'px)';

            spyMap.resize(options.size, options.size);
            opt.size = options.size;
        }
    }

    /****************************
     * Private Methods
     ***************************/

    /** Attach map move handlers to the maps to synchronize them. */
    private _attachMapMoveHandlers() {
        this._maps.forEach((map, index) => {
            map.events.add('move', this._syncEvents[index]);
        });
    }

    /** Detach map move handlers to the maps. */
    private _detachMapMoveHandlers() {
        this._maps.forEach((map, index) => {
            map.events.remove('move', this._syncEvents[index]);
        });
    }

    /**
     * Synchronize all maps with a base map.
     * @param baseMap The base map to synchronize with. 
     */
    private _synchronizeMaps(baseMap: azmaps.Map) {
        const self = this;
        const targetMaps = self._maps.filter(function (m, i) { return m !== baseMap; });

        self._detachMapMoveHandlers();
        const cam = baseMap.getCamera();

        targetMaps.forEach(function (targetMap) {
            targetMap.setCamera({
                center: cam.center,
                zoom: cam.zoom,
                bearing: cam.bearing,
                pitch: cam.pitch,
                type: 'jump'
            });
        });
        self._attachMapMoveHandlers();
    }
}