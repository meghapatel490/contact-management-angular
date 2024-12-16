import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute }  from '@angular/router'; 

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css'
})
export class CreateContactComponent {
  contactForm!: FormGroup<any>;         
  submitted = false;
  
  constructor(private dataService: DataService, private fb: FormBuilder, private _router: Router, private location: Location,private route: ActivatedRoute,){
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email])
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }
    this.dataService.postData(this.contactForm.value).subscribe(
      data => {
        console.log(data);
        this._router.navigate(['view-contact']);
      },
      (error) => {console.log(error); alert(error.statusText); }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.contactForm.reset();
  }

  goBack(): void {
    this.location.back();
  }
}
