import { workingDetails } from './../../Models/CustomersModels/Individual/workingDetails';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-personal-working-details',
  templateUrl: './personal-working-details.component.html',
  styleUrls: ['./personal-working-details.component.css']
})
export class PersonalWorkingDetailsComponent implements OnInit {
  @Input() workingInfo:workingDetails=new workingDetails();
  @Input() isViewMode: boolean = false;

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.requestForm = this.formBuilder.group({
      jobTitle: [''],
      jobDate: [''],
      companyName: ['', ],
      position: [''],
      educationLevel: ['', [Validators.required ]],
  });

  }

  get ctrl() { return this.requestForm.controls; }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
  }
  this.clickedNext.emit();
  
}


onPrevious(){
  this.clickedPrevious.emit();
 
  
}
}
