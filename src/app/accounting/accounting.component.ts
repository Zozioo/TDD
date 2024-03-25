import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent {

  @Input() amount!: number;

  @Output() amountChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(){
this.amountChange.emit(10)
  }
}
