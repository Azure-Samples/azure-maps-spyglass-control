---
page_type: sample
description: An Azure Maps Web SDK module that provides a window that displays a data set inside of a spyglass on the map.
languages:
- javascript
- typescript
products:
- azure
- azure-maps
---

# Azure Maps Spyglass module

An Azure Maps Web SDK module that provides a window that displays a data set inside of a spyglass on the map.

**Samples**

[Spyglass map visualization](https://samples.azuremaps.com/?sample=spyglass-map-visualization)
<br/>[<img src="https://github.com/Azure-Samples/AzureMapsCodeSamples/blob/main/Samples/Controls/Spyglass%20map%20visualization/screenshot.jpg?raw=true" height="200px">](https://samples.azuremaps.com/?sample=spyglass-map-visualization)

[Spyglass module options](https://samples.azuremaps.com/?sample=spyglass-module-options)
<br/>[<img src="https://github.com/Azure-Samples/AzureMapsCodeSamples/blob/main/Samples/Controls/Spyglass%20module%20options/screenshot.jpg?raw=true" height="200px">](https://samples.azuremaps.com/?sample=spyglass-module-options)

## Getting started

Download the project and copy the `azure-maps-spyglass` JavaScript file from the `dist` folder into your project. 

**Usage**

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>

    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Add references to the Azure Maps Map control JavaScript and CSS files. -->
    <link rel="stylesheet" href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css" type="text/css" />
    <script src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"></script>
    
    <!-- Add reference to the spyglass window module. -->
    <script src="../dist/azure-maps-spyglass.min.js"></script>

    <script type='text/javascript'>
        var primaryMap, spyMap;

        function GetMap() {
            //Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
            var authOptions = {
				authType: 'subscriptionKey',
				subscriptionKey: '<Your Azure Maps Key>'
            };

            //Initialize a map instances.
            primaryMap = new atlas.Map('primaryMap', {
                center: [-87.65, 41.87],
                zoom: 11,
                view: 'Auto',
                authOptions: authOptions
            });

            spyMap = new atlas.Map('spyMap', {
				view: 'Auto',
                authOptions: authOptions
            });

            //Create an insteance of the spyglass.
            new atlas.Spyglass(primaryMap, spyMap, {
                size: 400,
                borderColor: '#555555',
                borderWidth: 8
            });

            //Wait until the spyMap resources are ready and then load some data into is.
            spyMap.events.add('ready', function () {

                //Add some data to the map to peak into with the spy glass.

                //In this example we overlay of an old map image to the spyglass map.
                spyMap.layers.add(new atlas.layer.ImageLayer({
                    url: 'https://azuremapscodesamples.azurewebsites.net/Common/images/image-overlays/Chicago_1872_Map.png',
                    coordinates: [
                        [-87.732, 41.938], //Top Left Corner
                        [-87.592, 41.9381], //Top Right Corner
                        [-87.589, 41.811], //Bottom Right Corner
                        [-87.7298, 41.8105]  //Bottom Left Corner
                    ]
                }));
            });
        }
    </script>
    <style>
        html, body {
    		width: 100%;
    		height: 100%;
    		padding: 0;
    		margin: 0;
    	}
	
        .mapContainer {
            position: relative;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body onload="GetMap()">
    <div class="mapContainer">
        <div id="primaryMap" class="mapContainer"></div>
        <div id="spyMap"></div>
    </div>
</body>
</html>
```

## API Reference

### Spyglass class

Namespace: `atlas`

A control that provides a window into a data set inside of a spy glass on the map.

**Contstructor**

> `Spyglass(primaryMap: azmaps.Map, spyMap: azmaps.Map, options?: SpyglassOptions)`

* primaryMap - The primary map the spy glass will be overlaid on top of.
* spyMap - The map to be used as the spy glass.
* options - The options for the control.

**Methods** 

| Name | Return type | Description |
|------|-------------|-------------|
| `dispose()` | | Dispose the control and clean up its resources. |
| `getOptions()` | `SpyglassOptions` | Gets the options of the Spyglass control. |
| `setOptions(options: SpyglassOptions)` | | Sets the options of the spyglass control. |

### SpyglassOptions interface

Options for the Spyglass.

**Properties** 

| Name | Type | Description |
|------|------|-------------|
| `borderColor` | `string` | The color of the border. Can be any CSS3 color. Default: `'#555555'` (drak grey) |
| `borderWidth` | `number` | The width of the border in pixels. Default: `5` |
| `opacity` | `number` | The opacity of the map in the spyglass. Default: `1` |
| `shape` | `'circle'` \| `'square'` | The shape of the spyglass. Can be 'circle' or 'square'. Default: `'circle'` |
| `size` | `number` | The size width/height of the shape. Default: `350` |

## Related Projects

* [Azure Maps Web SDK Open modules](https://github.com/microsoft/Maps/blob/master/AzureMaps.md#open-web-sdk-modules) - A collection of open source modules that extend the Azure Maps Web SDK.
* [Azure Maps Web SDK Samples](https://github.com/Azure-Samples/AzureMapsCodeSamples)
* [Azure Maps Gov Cloud Web SDK Samples](https://github.com/Azure-Samples/AzureMapsGovCloudCodeSamples)
* [Azure Maps & Azure Active Directory Samples](https://github.com/Azure-Samples/Azure-Maps-AzureAD-Samples)
* [List of open-source Azure Maps projects](https://github.com/microsoft/Maps/blob/master/AzureMaps.md)

## Additional Resources

* [Azure Maps (main site)](https://azure.com/maps)
* [Azure Maps Documentation](https://docs.microsoft.com/azure/azure-maps/index)
* [Azure Maps Blog](https://azure.microsoft.com/blog/topics/azure-maps/)
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

## Contributing

We welcome contributions. Feel free to submit code samples, file issues and pull requests on the repo and we'll address them as we can. 
Learn more about how you can help on our [Contribution Rules & Guidelines](https://github.com/Azure-Samples/azure-maps-spyglass/blob/main/CONTRIBUTING.md). 

You can reach out to us anytime with questions and suggestions using our communities below:
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). 
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or 
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

MIT
 
See [License](https://github.com/Azure-Samples/azure-maps-spyglass/blob/main/LICENSE.md) for full license text.
