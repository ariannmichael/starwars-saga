import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from './../../shared/model/vehicle.model';

/**
 * Service to request vehicles data from the api
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  public fetchVehicle(url: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(url);
  }

}
