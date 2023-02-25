import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  @ViewChild(MatTable) table!: MatTable<IContact>;

  constructor(
    private phonebookService: PhonebookService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.phonebookService
      .getAllPhonebooks()
      .subscribe((contacts) => (this.contacts = contacts));
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
}
