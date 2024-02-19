import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {


  private _age:number=0;

  constructor(private http: HttpClient) {
  }

  isValidNumber(a: any):boolean{
    return !!a && typeof a ==='number' && !isNaN(a)
  }

  get age(){
    return this._age;
  }

  set age(value:number){
    this._age = value;
  }

  getCheckerData(){
    return this.http.get<any[]>('assets/checkerData.json');
  }

}
