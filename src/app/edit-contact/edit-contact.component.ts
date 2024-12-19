import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router }  from '@angular/router'; 
import { Contact } from '../model/contact';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports:  [ReactiveFormsModule, NgClass],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent {
  editContactForm!: FormGroup<any>;         
  submitted = false;
  existingContactId : number = 0;
  existingContact : Contact | undefined;
  @Input('id') contactId ='';

  constructor(private dataService: DataService, private fb: FormBuilder, private _router: Router, private location: Location){
    this.editContactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email])
    });
  }

  ngOnInit(): void {
    if (this.contactId ) {
      this.existingContactId = Number(Number(this.contactId));
    }
    this.dataService.getDataById(this.existingContactId).subscribe(data => {
      this.existingContact = <Contact>data;
      this.editContactForm = new FormGroup({
        firstName: new FormControl(this.existingContact.firstName, Validators.required),
        lastName: new FormControl(this.existingContact.lastName, Validators.required),
        email: new FormControl(this.existingContact.email, [Validators.email])
      });

    },
    (error) => {
      console.log(error); 
      alert(error); 
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editContactForm.invalid) {
      return;
    }

    this.dataService.putData(this.editContactForm.value, this.existingContactId).subscribe(
        (data) => {
          console.log(data);
          this._router.navigate(['/view-contact']);
        },
        (error) => {
          console.log(error); 
          alert(error); 
        }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.editContactForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

  get f(): { [key: string]: AbstractControl } {
      return this.editContactForm.controls;
    }
}
