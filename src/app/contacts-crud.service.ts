import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ContactsCrudService {
  constructor(private toastr: ToastrService) {}
  submitForm(formData) {
    let newContact = formData;
    //uzmi kontakte iz local storagea i pushaj novi
    let contactsFromLocalStorage = JSON.parse(localStorage.getItem("contactsListStorage"));
    //postojeci kontakti
    //savedDataToLocalStorage.push(contactsFromLocalStorage);
    //pushanje novog kontakta
    contactsFromLocalStorage.push(
      new ContactsList(
        newContact.contact_id,
        newContact.contact_first_name,
        newContact.contact_last_name,
        newContact.contact_avatar,
        newContact.contact_email,
        newContact.contact_favorite,
        newContact.contact_phone
      )
    );
    localStorage.setItem("contactsListStorage", JSON.stringify(contactsFromLocalStorage));
    this.toastr.success("Contact successfully added to local storage");
  }

  onDelete(index: number, contact) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      contact.splice(index, 1);
      localStorage.setItem("contactsListStorage", JSON.stringify(contact));
    }
    this.toastr.error("Contact successfully deleted");
  }

  selectFavorite(index: number, contact) {
    if (contact[index].contact_favorite == true) {
      contact[index].contact_favorite = false;
      localStorage.setItem("contactsListStorage", JSON.stringify(contact));
    } else {
      contact[index].contact_favorite = true;
      localStorage.setItem("contactsListStorage", JSON.stringify(contact));
    }
  }
  editForm(editContact) {
    this.toastr.success("Contact successfully updated!!!");
    let contactsListStorage = JSON.parse(localStorage.getItem("contactsListStorage"));
    let foundIndex = contactsListStorage.findIndex(x => x.contact_id === editContact.contact_id);

    contactsListStorage[foundIndex].contact_first_name = editContact.contact_first_name;
    contactsListStorage[foundIndex].contact_last_name = editContact.contact_last_name;
    contactsListStorage[foundIndex].contact_avatar = editContact.contact_avatar;
    contactsListStorage[foundIndex].contact_email = editContact.contact_email;
    contactsListStorage[foundIndex].contact_favorite = editContact.contact_favorite;
    contactsListStorage[foundIndex].contact_phone = editContact.contact_phone;
    localStorage.removeItem("contactsListStorage");
    localStorage.setItem("contactsListStorage", JSON.stringify(contactsListStorage));
  }
}

export class ContactsList {
  constructor(
    public contact_id: number,
    public contact_first_name: string = "",
    public contact_last_name: string = "",
    public contact_avatar: string = "",
    public contact_email: string = "",
    public contact_favorite: Boolean,
    public contact_phone: any[]
  ) {}
}
