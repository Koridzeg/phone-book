import {
  Component,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PhonebookService } from '../services/phonebooks.service';
import { IContact } from '../types/types';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css'],
})
export class PhonebookComponent implements AfterViewInit {
  contacts: IContact[] = [];
  selectedContact: IContact = { name: '', surname: '', phone: '' };
  isEditing = false;
  searchTerm: string = '';

  onSearch() {
    this.phonebookService
      .getAllPhonebooks()
      .subscribe((contacts: IContact[]) => {
        this.contacts = contacts.filter((contact) => {
          const name = contact.name.toLowerCase();
          const surname = contact.surname.toLowerCase();
          const phone = contact.phone.toLowerCase();
          return (
            name.includes(this.searchTerm.toLowerCase()) ||
            surname.includes(this.searchTerm.toLowerCase()) ||
            phone.includes(this.searchTerm.toLowerCase())
          );
        });
      });
  }

  @ViewChild(MatTable) table!: MatTable<IContact>;

  constructor(private phonebookService: PhonebookService) {}

  ngOnInit() {
    this.phonebookService
      .getAllPhonebooks()
      .subscribe((contacts: IContact[]) => (this.contacts = contacts));
  }

  ngAfterViewInit() {
    this.table.dataSource = this.contacts;
  }

  addContact(contact: IContact) {
    this.phonebookService.createPhonebook(contact).subscribe((newContact) => {
      this.contacts.push(newContact);
      this.table.renderRows(); // render the updated rows
    });
  }

  deleteContact(id: string) {
    this.phonebookService.deletePhonebook(id).subscribe(() => {
      this.contacts = this.contacts.filter((contact) => contact._id !== id);
      this.table.renderRows(); // render the updated rows
    });
  }

  updateContact(contact: IContact) {
    if (contact._id && this.selectedContact) {
      this.phonebookService
        .updatePhonebook(contact, contact._id)
        .subscribe((updatedContact) => {
          const index = this.contacts.findIndex(
            (c) => c._id === updatedContact._id
          );
          this.contacts[index] = updatedContact;
          this.table.renderRows();
          this.isEditing = false;
          this.selectedContact = { ...contact };
        });
    }
  }

  editContact(contact: IContact) {
    this.selectedContact = { ...contact };
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
