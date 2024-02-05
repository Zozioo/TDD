import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountingService } from '../shared/services/accounting/accounting.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent {

  @Input() amount!: number;

  @Output() amountChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private accountingS:AccountingService){

  }
}
