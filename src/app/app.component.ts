import { AccountingService } from './shared/services/accounting/accounting.service';
import { CheckerService } from './shared/services/checker/checker.service';
import { Component } from '@angular/core';

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
    private checkerService: CheckerService,
    private accountingService: AccountingService
    ){}


  public get name():string{
    return 'Zoé';
  }


  public changeAge(){
    this.age = 12;
  }


    public multiplier(a:any, b:any){
      if(this.checkerService.isValidNumber(a) && this.checkerService.isValidNumber(b)){
        return a*b;
     }
     throw new Error('Sorry it is not a valid number');
    }

  getFullAmount():number{
    return this.accountingService.getFullAmount();
  }

  handleAmountChange(amount:number):void{
    this.currentAmount = amount;
  }

  ecrisUntruc():void{
    console.log('hello');
  }

  returnData(){
    return this.checkerService.getCheckerData()
      .subscribe
    ({
      next:(data:any[])=> console.log(data),
      error:(err) => console.log('No, something went wrong',err),
      complete:()=> console.log('http request completed')
  })

  }
}
