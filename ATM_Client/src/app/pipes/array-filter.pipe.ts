import { Pipe, PipeTransform } from '@angular/core';
import { AtmTransaction } from '../models/atm.interface';

@Pipe({
  name: 'arrayFilter',
  pure: true
})
export class ArrayFilterPipe implements PipeTransform {

  transform(transactions : Array<AtmTransaction>){
    if (!transactions) return transactions;
    return transactions.filter(transaction => {
      transaction.transactionType=='Deposit'
    })
  }

}
