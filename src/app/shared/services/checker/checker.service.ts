import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {


  private _age:number=0;

  constructor() { }


  isValidNumber(a: any):boolean{
    return !!a && typeof a ==='number' && !isNaN(a)
  }

  public get age(){
    return this._age;
  }

  public set age(value:number){
    this._age = value;
  }
}
