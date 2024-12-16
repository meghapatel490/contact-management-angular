import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute }  from '@angular/router'; 
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
  
  constructor(private dataService: DataService, private fb: FormBuilder, private _router: Router, private location: Location,private route: ActivatedRoute){
    this.editContactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email])
    });
  }

  ngOnInit(): void {
    this.existingContactId = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getDataById(this.existingContactId).subscribe(data => {
      this.existingContact = <Contact>data;
      this.editContactForm = new FormGroup({
        firstName: new FormControl(this.existingContact.firstName, Validators.required),
        lastName: new FormControl(this.existingContact.lastName, Validators.required),
        email: new FormControl(this.existingContact.email, [Validators.email])
      });

    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editContactForm.invalid) {
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.dataService.putData(this.editContactForm.value, id).subscribe(
        (data) => {
          console.log(data);
          this._router.navigate(['/view-contact']);
        },
        (error) => {console.log(error); alert(error.statusText); }
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
