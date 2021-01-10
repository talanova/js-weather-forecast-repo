This repo is a hw about getting weather forecast for the cities.

[![codecov](https://codecov.io/gh/talanova/js-weather-forecast-repo/branch/master/graph/badge.svg)](https://codecov.io/gh/talanova/js-weather-forecast-repo)

You type the name of the city in the input field when you press "get weather" button. As a result, you will see the weather forecast and map for the selected city.
For the first time, you will see the weather forecast for your current location.
For easy of use, the last 10 searched cities are saved and you can quickly select them from the list.

All code is locsted in src folder and separeted in modules: index, initial, weather, list and map.
You start in index.js. From initial.js you get the basic markup. Weather.js provides methods for getting and drawing a weather forecast. List.js provides methods for reading, saving and drawing a list of cities. Map.js provides the source of the map image.
