import * as azmaps from 'azure-maps-control';

declare namespace atlas {    

    /** Options for the Spyglass. */
    export interface SpyglassOptions {

        /** The color of the border. Can be any CSS3 color. Default: '#555555' (drak grey) */
        borderColor?: string;

        /** The width of the border in pixels. Default: 5 */
        borderWidth?: number;

        /** The opacity of the map in the spyglass. Default: 1 */
        opacity?: number;

        /** The shape of the spyglass. Can be 'circle' or 'square'. Default: 'circle' */
        shape?: 'circle' | 'square';

        /** The size width/height of the shape. Default: 350 */
        size?: number;
    }

    /** A control that provides a window into a data set inside of a spy glass on the map. */
    export class Spyglass {
        /****************************
         * Constructor
         ***************************/

        /**
            * A control that provides a window into a data set inside of a spy glass on the map.
            * @param primaryMap The primary map the spy glass will be overlaid on top of.
            * @param spyMap The map to be used as the spy glass.
            * @param options The options for the control
            */
        constructor(primaryMap: azmaps.Map, spyMap: azmaps.Map, options?: SpyglassOptions);

        /****************************
            * Public Methods
            ***************************/

        /** Dispose the control and clean up its resources. */
        public dispose(): void;

        /** Gets the options of the Spyglass control. */
        public getOptions(): SpyglassOptions;

        /**
            * Sets the options of the spyglass control.
            * @param options The options to set.
            */
        public setOptions(options: SpyglassOptions): void;
    }
}

export = atlas;