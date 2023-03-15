import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SharedService } from 'src/app/shared/sevices/shared.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  @Input('customerDetails') customerDetails!: any;

  @Output('closeEditNav') closeEditNav = new EventEmitter<boolean>()
  @Output('detailsUpdated') detailsUpdated = new EventEmitter<any>()

  public options: string[] = ['Shibpur', 'Esplanade', 'Sarkar Bazar', 'Salkia', 'Central']
  public selectedOption: string = ''
  public customerDetailsCopy: any

  constructor(private services: SharedService) { }

  ngOnInit(): void { }

  onSelectedOption(option: string) {
    this.selectedOption = option;

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerDetails'].currentValue)
      this.customerDetailsCopy = JSON.parse(JSON.stringify(this.customerDetails));
  }

  public updateCustomer() {
    this.services.updateCustomer(this.customerDetailsCopy, this.customerDetails.id).subscribe({
      next: (res) => {
        console.log(res);
        this.detailsUpdated.emit(this.customerDetailsCopy)
        this.closeEditNav.emit(true)
      },
      error: (err) => {
        console.log(err);

      }
    })

  }

  public closeSideNav() {
    this.closeEditNav.emit(true)
  }



}


