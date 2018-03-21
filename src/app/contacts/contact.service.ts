import {Injectable} from '@angular/core';
import {Contact} from './contact';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {
  private contactsUrl = '/api/contacts';

  constructor(private http: Http) {
  }

  // get("/api/contacts")
  getContacts(): Promise<Contact[]> {
    return this.http.get(this.contactsUrl)
      .toPromise()
      .then(response => response.json() as Contact[])
      .catch(this.handleError);
  }

  // post("/api/contacts")
  createContact(newContact: Contact): Promise<Contact> {
    return this.http.post(this.contactsUrl, newContact)
      .toPromise()
      .then(response => response.json() as Contact)
      .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app

  // delete("/api/contacts/:id")
  deleteContact(delContactId: String): Promise<String> {
    return this.http.delete(this.contactsUrl + '/' + delContactId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateContact(putContact: Contact): Promise<Contact> {
    var putUrl = this.contactsUrl + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
      .toPromise()
      .then(response => response.json() as Contact)
      .catch(this.handleError);
  }

  clear(): Promise<any> {
    return this.http.get("/api/clear", function (req, res) {
    }).toPromise()
  }

  nextStepSam(): Promise<any> {
    return this.http.get("/api/dashboard/next/push/Sam", function (req, res) {
    }).toPromise()
  }

  openStepSam(step): Promise<any> {
    return this.http.get("/api/dashboard/step/push/Sam/" + step, function (req, res) {
    }).toPromise()
  }


  nextStepRicky(): Promise<any> {
    return this.http.get("/api/dashboard/next/push/Ricky", function (req, res) {
    }).toPromise()
  }

  openStepRicky(step): Promise<any> {
    return this.http.get("/api/dashboard/step/push/Ricky/" + step, function (req, res) {
    }).toPromise()
  }

  setLowQuality(): Promise<any> {
    return this.http.get("/api/dashboard/video/setLow", function (req, res) {
    }).toPromise()
  }

  setHdQuality(): Promise<any> {
    return this.http.get("/api/dashboard/video/setHd", function (req, res) {
    }).toPromise()
  }

  showArsenal(): Promise<any> {
    return this.http.get("/api/dashboard/footbal/arsenal", function (req, res) {
    }).toPromise()
  }

  showManchester(): Promise<any> {
    return this.http.get("/api/dashboard/footbal/manchester", function (req, res) {
    }).toPromise()
  }

  addScoreArsenal(): Promise<any> {
    return this.http.get("/api/dashboard/footbal/arsenal/add", function (req, res) {
    }).toPromise()
  }

  addScoreEvertone(): Promise<any> {
    return this.http.get("/api/dashboard/footbal/evertone/add", function (req, res) {
    }).toPromise()
  }

  romeLocation(): Promise<any> {
    return this.http.get("/api/location/rome", function (req, res) {
    }).toPromise()
  }

  londonLocation(): Promise<any> {
    return this.http.get("/api/location/london", function (req, res) {
    }).toPromise()
  }

  dubaiLocation(): Promise<any> {
    return this.http.get("/api/location/dubai", function (req, res) {
    }).toPromise()
  }

  qatarLocation(): Promise<any> {
    return this.http.get("/api/location/qatar", function (req, res) {
    }).toPromise()
  }

  private handleError(error: any): Promise<any> {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console
    return Promise.reject(errMsg);
  }
}
