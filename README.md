# Angular Data Visualization App

This project is a responsive and interactive web application built using Angular and Apache ECharts. It visualizes both static and dynamic productivity data using rich, animated charts. The app is designed to be clean, visually appealing, and easy to extend.

---

## Overview

This application demonstrates how Angular can be used with ECharts to build a robust, component-based data visualization platform. It includes two primary modes:

- **Static Data View**: Displays predefined datasets.
- **Dynamic Data View**: Pulls real-time data from external APIs.

---

## Features

- Dynamic charts built with Apache ECharts  
- Clean, modern, and responsive UI  
- Supports static and real-time data visualizations  
- Modular Angular component structure  
- Integration tips for tools like GitHub, and TodoList

---

## Live Demo

You can try the live version of this application here:

👉 [View Demo](https://dataviewangular.netlify.app/)



This live demo showcases:
- Angular component structure in action
- ECharts visualizations using both static and dynamic data
- Responsive UI with animated cards and tips section


## Project Setup

Follow these steps to get the app running locally:

### 1. Clone the repository

```bash
git clone https://github.com/prafulla231/DataChartAppAngular.git

cd DataChartAppAngular
```

### 2. Install dependencies

Make sure you have Node.js and Angular CLI installed, then run:

```bash
npm install
```

### 3. Run the application

```bash
ng serve
```

Open your browser and visit `http://localhost:4200` to view the app.

---

## Components Overview

### AppComponent
- Root component  
- Manages layout and router outlet

### HeaderComponent
- Displays the hero section with project title, description, and a visual banner  
- Includes responsive image animation and headline

### HomeComponent
- Landing page of the app  
- Contains navigation cards for "Static Data" and "Dynamic Data" views  
- Displays a tip section at the bottom for productivity tool integration

### StaticDataComponent
- Shows ECharts visualizations based on hardcoded or locally stored datasets

### DynamicDataComponent
- Fetches live data from an API (e.g., JSONPlaceholder or your own endpoint)  
- Displays real-time updates with chart transitions and error handling

### ChartComponent
- A reusable ECharts wrapper component  
- Accepts chart configuration and renders the corresponding visualization

---

## ECharts Integration

1. Install ECharts via npm:

```bash
npm install echarts --save
```


## Challenges Faced

### Image Path Issues
- Images initially failed to load due to incorrect paths.  
- Solution: Reorganized assets and updated `angular.json` to include:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "src/assets",
    "output": "/assets"
  }
]
```



### API Integration
- Handled errors from unavailable or unstable endpoints.  
- Used `HttpClient` with proper loading states and fallback UI messages.

### Chart Responsiveness
- Chart would not resize correctly on smaller screens.  
- Solution: Implemented responsive resizing using `ResizeObserver` and CSS max-width constraints.

## Build Warnings and Bundle Budget

When building the Angular application using the production configuration, the build process failed due to the application bundle exceeding the defined size budget.







---

## How to Use

1. Clone and install the application using the steps above.

2. Use the homepage navigation to explore:
   - **Static Data**: Predefined chart views
   - **Dynamic Data**: Real-time API visualizations

3. You can modify the API URL or data in the respective components  to connect your own data sources.

4. Optional: Extend integration with external tools like Todoist or GitHub by adding OAuth or public APIs in the `DynamicDataComponent`.

---

## Folder Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── home/
│   │   ├── static-data/
│   │   ├── dynamic-data/
│   │   └── shared/chart/
│   ├── assets/
│   │   └── images/
│   ├── app.module.ts
│   └── app-routing.module.ts
├── index.html
├── styles.css
```

---


