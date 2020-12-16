import * as azmaps from "azure-maps-control";

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