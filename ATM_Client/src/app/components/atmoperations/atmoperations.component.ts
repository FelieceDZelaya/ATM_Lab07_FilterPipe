import { Component, OnInit } from '@angular/core';
import { AtmServiceService } from '../../services/atm-service.service';
import { AtmResponseOperation,AtmResponseOperationBalance } from '../../models/atm.interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-atmoperations',
  templateUrl: './atmoperations.component.html',
  styleUrls: ['./atmoperations.component.css']
})
export class AtmoperationsComponent implements OnInit {
  
  public currentOperation   : string = '';
  public currentBalance     : number = 0;
  public atmResponse        : AtmResponseOperation = <AtmResponseOperation>{}; 
  public atmResponseBalance : AtmResponseOperationBalance = <AtmResponseOperationBalance>{};
  transactionAmountForm : FormGroup;
  public usrTransactionAmount : number = 0;

  constructor(public atmService : AtmServiceService,
  public route : ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(data=>{

      switch (data['arg']) {
            case 'deposit'   : { 
              this.currentOperation = "Making a Deposit";
              break 
            }
            case 'withdrawal' : { 
              this.currentOperation = "Making a Withdrawl";
              break 
            }
            
      }
  });

    this.transactionAmountForm = new FormGroup({
      transactionAmount : new FormControl('',Validators.required)
    }
    );
            
  }

  performOperation(){
    let acctNumber = this.atmService.getAccountNumber();

    this.route.params.subscribe(data=>{

            switch (data['arg']) {
                  case 'deposit'   : { 
                    this.makeADeposit(acctNumber,Number(this.transactionAmountForm.get("transactionAmount").value)); 
                    this.transactionAmountForm.reset();
                    break 
                  }
                  case 'withdrawal' : { 
                    this.makeAWithdraw(acctNumber,Number(this.transactionAmountForm.get("transactionAmount").value)); 
                    this.transactionAmountForm.reset();
                    break 
                  }
                  
            }
    });
  }

  showBalance(acct:string) {

    this.currentOperation = 'Querying Balance';

    this.atmService.getCurrentBalance(acct).subscribe(result => {
            this.atmResponseBalance = result;
            this.currentBalance = result.currentBalance;
      });

  }

  makeADeposit(acct:string,amount:number) {

    this.atmService.deposit(acct,amount).then( result => {
               this.atmResponse = result;
               this.currentBalance = result.currentBalance;
    });
    
  }

  makeAWithdraw(acct:string,amount:number) {

        this.atmService.withDraw(acct,amount).then( result => {
                this.atmResponse = result;
                this.currentBalance = result.currentBalance;

      });  
  }

  showPanel(){
    return this.atmService.accountValid;
  }

}
