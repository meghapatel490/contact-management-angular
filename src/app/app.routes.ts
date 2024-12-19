import { Routes , RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateContactComponent } from '../app/create-contact/create-contact.component';
import { ViewContactsComponent } from '../app/view-contacts/view-contacts.component';
import { EditContactComponent } from '../app/edit-contact/edit-contact.component';

export const routes: Routes = [ 
    { path: 'view-contact', component: ViewContactsComponent },
    { path: 'contact', component: CreateContactComponent },
    { path: 'edit-contact/:id', component: EditContactComponent }
]; 

 @NgModule({ 
    imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })], 
    exports: [RouterModule] }) 

export class AppRoutingModule { }