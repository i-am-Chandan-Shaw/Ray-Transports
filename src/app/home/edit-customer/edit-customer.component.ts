import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { In_options } from 'src/app/shared/interface/In_options';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { locality } from 'src/app/shared/utils/filter-utils';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit, OnChanges {
  @Input('customerDetails') customerDetails?: any;

  @Output('closeEditNav') closeEditNav = new EventEmitter<boolean>();
  @Output('detailsUpdated') detailsUpdated = new EventEmitter<any>();

  checkAutoCompleteValue!: boolean;

  editForm = this.fb.group({
    customerName: ['', Validators.required],
    phoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: ['', Validators.required],
  });

  public options: In_options[] = locality;
  public selectedOption?: In_options;
  public customerDetailsCopy!: any;
  providedOption:any

  constructor(private services: SharedService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.providedOption = this.options.filter(item=>item?.displayName.toLocaleLowerCase() == this.customerDetails?.address.toLocaleLowerCase())
    if (this.editForm.value && this.editForm.value.address) {
      this.checkAutoCompleteValue = true;
    }
  }

  onSelectedOption(option: In_options) {
    this.editForm.patchValue({ address: option.displayName });
    // console.log('editForm',this.editForm.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerDetails'].currentValue != undefined) {
      if (changes['customerDetails'].currentValue) {
        this.customerDetailsCopy = JSON.parse(
          JSON.stringify(this.customerDetails)
        );
        this.editForm.patchValue({
          customerName: this.customerDetailsCopy.name,
          phoneNo: this.customerDetailsCopy.phone,
          address: this.customerDetailsCopy.address,
        });
      }
    }
  }
  autoCompleteOutputValue(e: any) {
    // this.checkAutoCompleteValue = e
    if (this.editForm.value && this.editForm.value.address !== '') {
      this.checkAutoCompleteValue = false;
    }
    for (let option of this.options) {
      let temp = option.value?.toLowerCase();
      let tempInput = e.value?.toLowerCase();
      if (temp == tempInput) {
        this.checkAutoCompleteValue = true;
        break;
      } else {
        this.checkAutoCompleteValue = false;
      }
    }
  }

  public updateCustomer() {
    this.customerDetailsCopy.name = this.editForm.value.customerName;
    this.customerDetailsCopy.address = this.editForm.value.address;
    this.customerDetailsCopy.phone = this.editForm.value.phoneNo;

    this.services
      .updateCustomer(this.customerDetailsCopy, this.customerDetails.id)
      .subscribe({
        next: (res) => {
          this.detailsUpdated.emit(this.customerDetailsCopy);
          this.closeEditNav.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public closeSideNav() {
    this.closeEditNav.emit(true);
  }

  onResetForm(){
    
    this.editForm.reset()
    this.customerDetails = null
    this.ngOnInit()
  }
}


