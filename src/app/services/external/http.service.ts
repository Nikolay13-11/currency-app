import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRates} from "../../models/models";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getRates() {
    return this.http.get<IRates[]>(`https://api.nbp.pl/api/exchangerates/tables/A/?format=json`)
  }

  getRatesByDate(date: string) {
    return this.http.get<IRates[]>(`https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`)
  }
}
