# Magenta - Flight Planning App for private pilots

Magenta is Flight Planning App that helps you plan your flight route and gives up-to-date weather information. Finally, your plan can be printed on paper as an operational flight plan, or you can take the plan with you on a mobile device.

## Project Description

I'm currently a student pilot at Finnish Aviation Academy, pursuing for ATPL(A) commercial pilot license. Project started out of my personal interest to upgrade the Excel-based flight planning to more visual web app format.

App is build with React.js. It uses Leaflet for mapping and airportdb.io API for fetching the airport data. Weather is received from api.met.no and opendata.fmi.fi. UI is build with DaisyUI and TailwindCSS.

The core of the app is already working as expected, but I do have a long backlog of features including:

* Adding more rich data into the map, especially to route point popups
* Cleaning up the OFP print, currently it's OK but I'm not fully satisfied
* Adding functional fuel calculations
* Adding rough weight-and-balance calculator

## How to run the app

App is available at https://magenta-flightplan.vercel.app/. To run it in your own system, please see "Getting started with create react app" at the end of the documentation. 

## How it works
1. Press Get Started on landing page
2. Add basic information about your flight. This is optional and currently only used at the OFP generation page.
3. Generate your route by 
* Searching for an airport from the searchbar. Fuzzy search is supported. You can use either ICAO ident (e.g. EFHK for Helsinki) or city name. VFR waypoints can also be search for. 
* Clicking on the map to add custom waypoint. 
* After searching, dropdown list will appear below the search bar. Here you can delete waypoints if needed. 
* Clicking the pin on the map will give you weather information and runway information (in case not a custom waypoint)
4. Check the weather. Past 5 METARs are fetched for airports that provide this information. 
5. Adjust the Operational Flight Plan. You can change following field directly in the table
* Min Alt - Minimum altitude for the leg
* Plan Alt - Planned altitude for the leg
* TAS - True Airspeed for the leg
* Wind (deg) - Wind direction
* Wind (kts) - Wind Speed
You can also fetch the wind data as follows:
* Input Plan alt for the legs
* Go to the menu top left and press "fetch wind". This will fetch the wind for the selected altitude from FMI. 
6. Print the OFP. Simply press <kbd>CTRL + P</kbd> and you get a formatted print preview. 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
