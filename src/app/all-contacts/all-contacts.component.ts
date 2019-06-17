import { Component, OnInit } from "@angular/core";
import { ContactsList, ContactsCrudService } from "../contacts-crud.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-all-contacts",
  templateUrl: "./all-contacts.component.html",
  styleUrls: ["./all-contacts.component.css"]
})
export class AllContactsComponent implements OnInit {
  contactsList: ContactsList[] = [];

  constructor(private CrudService: ContactsCrudService, private router: Router) {
    if (localStorage.getItem("contactsListStorage") === null) {
      this.contactsList.push(
        new ContactsList(0, "Amelia", "Smith", "https://randomuser.me//api//portraits//women//33.jpg", "amelia@smith.com", true, [
          { label: "mobile", value: "01 255 666459" },
          { label: "office", value: "121 21212 45454" },
          { label: "home", value: "01 545 7878" }
        ])
      );
      this.contactsList.push(
        new ContactsList(1, "Olivia", "Johnson", "https://randomuser.me//api//portraits//women//47.jpg", "olivia@johnson.com", false, [
          { label: "mobile", value: "04 1212 544545" },
          { label: "home", value: "05 1245 454" }
        ])
      );
      this.contactsList.push(
        new ContactsList(2, "Isla", "Williams", "https://randomuser.me//api//portraits//women//48.jpg", "isla@williams.com", false, [
          { label: "mobile", value: "035 2545 655" }
        ])
      );
      this.contactsList.push(new ContactsList(3, "Emily", "Isabella", "https://randomuser.me//api//portraits//women//79.jpg", "matea@matea.com", true, []));
      this.contactsList.push(
        new ContactsList(4, "Ria", "Jones", "https://randomuser.me//api//portraits//women//23.jpg", "ria@jones.com", true, [
          { label: "mobile", value: "04 1212 544545" },
          { label: "home", value: "05 1245 454" },
          { label: "office", value: "04 1212 544545" },
          { label: "factory", value: "05 1245 454" }
        ])
      );
      this.contactsList.push(
        new ContactsList(5, "Charlie", "Brown", "https://randomuser.me//api//portraits//men//44.jpg", "charlie@brown.com", false, [
          { label: "mobile", value: "04 1212 544545" },
          { label: "home", value: "05 1245 454" },
          { label: "factory", value: "05 1245 454" }
        ])
      );
      this.contactsList.push(
        new ContactsList(6, "Thomas", "Davis", "https://randomuser.me//api//portraits//men//68.jpg", "thomas@davis.com", false, [
          { label: "office", value: "04 1212 544545" }
        ])
      );
      this.contactsList.push(
        new ContactsList(7, "James", "Wilson", "https://randomuser.me//api//portraits//men//69.jpg", "james@wilson.com", true, ["mobile", "123456456"])
      );
    } else {
      //when a new contact is added, it is switched to local storage so that it does not lose on refresh immediately
      this.getContactDataFromLocalStorage();
    }
  }

  ngOnInit() {
    localStorage.setItem("contactsListStorage", JSON.stringify(this.contactsList));
  }

  //get data from storage
  getContactDataFromLocalStorage() {
    let contactFromStorage = JSON.parse(localStorage.getItem("contactsListStorage"));
    for (let entry of contactFromStorage) {
      this.contactsList.push(
        new ContactsList(
          entry.contact_id,
          entry.contact_first_name,
          entry.contact_last_name,
          entry.contact_avatar,
          entry.contact_email,
          entry.contact_favorite,
          entry.contact_phone
        )
      );
    }
  }

  onDelete(index: number) {
    this.CrudService.onDelete(index, this.contactsList);
  }

  selectFavorite(id: number) {
    this.CrudService.selectFavorite(id, this.contactsList);
  }

  goToFavorites() {
    this.CrudService.navigateToFavorites();
  }
  goToAll() {
    this.CrudService.navigateToAll();
  }
}
