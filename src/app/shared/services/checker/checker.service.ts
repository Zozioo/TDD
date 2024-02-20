import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

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


  apiUrl = 'https://dummyjson.com'

  get<T>():Observable<T>{
    return this.http.get<T>(`${this.apiUrl}`);
  }

  getCheckerData(){
    return this.http.get<any[]>('assets/checkerData.json');
  }

}
