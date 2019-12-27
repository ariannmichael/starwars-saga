import { Vehicle } from './../../shared/model/vehicle.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  public fetchVehicle(url: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(url);
  }

}
