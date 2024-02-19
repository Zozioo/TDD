import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor() {}


  public getFullAmount() :number{
    return 10;
  }

  public getInitialAmount(){
    return 0;
  }
}
