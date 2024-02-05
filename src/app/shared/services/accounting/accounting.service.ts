import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http: HttpClient) {}


  public getFullAmount() :number{
    return 10;
  }

  public getInitialAmount(){
    return 0;
  }
}
