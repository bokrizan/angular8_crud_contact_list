import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormBuilder } from "@angular/forms";
import { ContactsCrudService } from "../contacts-crud.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-new",
  templateUrl: "./add-new.component.html",
  styleUrls: ["./add-new.component.css"]
})
export class AddNewComponent implements OnInit {
  @Input() id: number;
  addContactForm: FormGroup;
  contactList: FormArray;

  constructor(private CrudService: ContactsCrudService, private location: Location, private formBuilder: FormBuilder, private router: Router) {
    // this.createForm();
  }

  ngOnInit() {
    this.addContactForm = this.formBuilder.group({
      contact_id: Math.floor(Math.random() * 200) + 1,
      contact_first_name: "",
      contact_last_name: "",
      contact_avatar: "https://i.pravatar.cc/300",
      contact_email: "",
      contact_favorite: false,
      contact_phone: this.formBuilder.array([this.createContactNumber()])
    });

    // set contactlist to the form control containing contacts
    this.contactList = this.addContactForm.get("contact_phone") as FormArray;
  }

  submitForm() {
    this.CrudService.submitForm(this.addContactForm.value);
    this.router.navigate([""]);
  }

  private createContactNumber(): FormGroup {
    return this.formBuilder.group({
      label: [""],
      value: [""]
    });
  }
  // add a contact form group
  addContactNumber() {
    this.contactList.push(this.createContactNumber());
  }
  // remove contact from group
  removeContactNumber(index) {
    this.contactList.removeAt(index);
  }
  get contactFormGroup() {
    return this.addContactForm.get("contact_phone") as FormArray;
  }

  goBack() {
    this.location.back();
  }
}
