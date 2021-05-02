import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private http:HttpClient) {

  }
  
  getCityDetails():Observable<any> {
    return this.http.get(
      "data-source/cities.json"
    );
  }
  
}
