import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent {
  @Input()
  contact: Contact;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private contactService: ContactService) {}

  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
  }

  clearAll(): void {
    this.contactService.clear();
  }

  nextStepSam(): void {
    this.contactService.nextStepSam();
  }

  nextStepRicky(): void {
    this.contactService.nextStepRicky();
  }

  openStepRicky(step): void {
    this.contactService.openStepRicky(step);
  }

  openStepSam(step): void {
    this.contactService.openStepSam(step);
  }

  setLowQuality(){
    this.contactService.setLowQuality();
  }
  setHdQuality(){
    this.contactService.setHdQuality();
  }

  showArsenal(){
    this.contactService.showArsenal();
  }
  showManchester(){
    this.contactService.showManchester();
  }

  addScoreArsenal(){
    this.contactService.addScoreArsenal();
  }
  addScoreEvertone(){
    this.contactService.addScoreEvertone();
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }
}
