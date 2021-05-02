import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { environment } from '../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-navigation-map",
  templateUrl: "./navigation-map.component.html",
  styleUrls: ["./navigation-map.component.scss"],
})
export class NavigationMapComponent implements OnInit {
  keyword: string = "name";
  citiesList: Array<any> = [];
  pathList: Array<any> = [];
  showButton: boolean = false;
  selectedCities: Array<any> = [];
  isSelectionValid: boolean = true;
  routeMap: Mapboxgl.Map;
  cordinates:Array<any>=[]
  constructor(private navigateService: NavigateService) {}

  ngOnInit() {
    this.navigateService.getCityDetails().subscribe((cities) => {
      this.citiesList = Object.values(cities);
    });
    Mapboxgl.accessToken = environment.mapboxKey;
  this.initializeMap([45.849382, 76.322333]);
  }
  ngAfterViewInit() {

  }

  initializeMap(cordinates) {
       this.routeMap = new Mapboxgl.Map({
         container: "map",
         style: "mapbox://styles/mapbox/streets-v11",
         center: cordinates,
         zoom: 1,
       }); 
     if (this.routeMap) {
       this.routeMap.on("load", () => {
         this.plotRoute();
       });
     }
    if (this.cordinates.length) {
      this.cordinates.forEach((obj,i) => {
        new Mapboxgl.Marker().setLngLat(obj).addTo(this.routeMap);
        var popup = new Mapboxgl.Popup({
          className: "my-class",
        })
          .setLngLat(obj)
          .setHTML(`<h3>${this.selectedCities[i].name}</h3>`)
          .setMaxWidth("100px")
          .addTo(this.routeMap);
      })
    }

  }
  

  plotRoute() {

  this.routeMap.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: this.cordinates
      },
    },
  });
    this.routeMap.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "red",
        "line-width": 8,
      },
    });
}
  addCityToPath(city) {
    let existingIndex = this.selectedCities.findIndex(obj => {
      if (obj)
        return obj.cityNumber == city.cityNumber
    })
    if (existingIndex !== -1) {
      this.selectedCities.splice(existingIndex, 1)
    }
       this.showButton = !!this.pathList.length;

    this.selectedCities[city.cityNumber] = city
    this.selectedCities = this.selectedCities.slice()
    if (this.selectedCities.length == 1) {
      this.pathList.push({})
    }
    
    
      this.isSelectionValid = !this.selectedCities.includes(null);

  }
  addDestination() {
    this.pathList.push({})
    this.showButton = false;
    
  }
  completeTrip() {
    this.selectedCities.push(this.selectedCities[0])
    this.selectedCities=this.selectedCities.filter(obj=>obj)
        this.cordinates = this.selectedCities.map((city) => {
          return Object.values(city.location).reverse();
        });
    this.initializeMap(this.cordinates[0])

  }
  cancelSelection(cityNumber) {
    this.isSelectionValid = false;
    this.selectedCities[cityNumber] = null;

  }
  deleteDestination(cityNumber) {
    this.selectedCities.splice(cityNumber, 1)
    this.pathList.splice(cityNumber-1,1)
    this.pathList = [...this.pathList];
    this.isSelectionValid=this.selectedCities.length>1
  }
}
