import { AccountingService } from './shared/services/accounting/accounting.service';
import { CheckerService } from './shared/services/checker/checker.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'TDD';
  age:number=1;
  currentAmount:number = 0;

  constructor(
    private fb:FormBuilder,
    private cs: CheckerService,
    private as: AccountingService
    ){}


  getinitialFullAmount():number{
    return this.as.getFullAmount();
  }

  
  public get name():string{
    return 'Zoé';
  }

  public changeAge(){
    this.age = 12;
  }

  public multiplier(a:any, b:any){
    if(this.cs.isValidNumber(a) && this.cs.isValidNumber(b)){
      const age = this.cs.age;
      return this.multiply(a,b);
   }
   throw new Error('Sorry it is not a valid number');
  }

  private multiply(a:number,b:number){
    return a*b;
  }


  public handleAmountChange(amount:number):void{
    this.currentAmount = amount;
  }
}
