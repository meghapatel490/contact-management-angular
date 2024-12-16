import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../model/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-contacts.component.html',
  styleUrl: './view-contacts.component.css'
})
export class ViewContactsComponent {

  contacts: Contact[] = [];

  constructor(private dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this.getContactDetails();
  }

  getContactDetails() {
    this.dataService.getData().subscribe(
        data => {
          this.contacts = data;
        },
        (error) => { console.log(error); alert(error.statusText); }
      );
  }

  createContact(e: Event) {
    this._router.navigate(['/contact']);
  }

  editContact(e: any) {
    this._router.navigate(['/edit-contact/' + e.id]);
  }

  deleteContact(e: any) {
    this.dataService.deleteData(e.id).subscribe(
      () => {
        alert("Contact deleted successfully.");
        this.getContactDetails();
      },
      (error) => {
        console.log(error); 
        alert(error.statusText); 
      }
    );
  }
}
