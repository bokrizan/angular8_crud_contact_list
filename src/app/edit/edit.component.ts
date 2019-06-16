import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormGroup, FormBuilder } from "@angular/forms";
import { ContactsCrudService } from "../contacts-crud.service";
import { Location } from "@angular/common";

import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  contact: any = [];
  getContact: any = [];
  id: number;
  sub: any;
  editContactForm: FormGroup;
  contactList: FormArray;
  /* need for use base64 */
  // base64textString: string;
  // imagePath: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private CrudService: ContactsCrudService,
    private location: Location
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"];
      this.getContact = JSON.parse(localStorage.getItem("contactsListStorage"));
      this.contact = this.getContact.find(x => x.contact_id === this.id);

      /* If we want base64 */
      //when we want to store img to local storage
      //check if avatar img is real img or base64

      // if (this.contact.contact_avatar.substring(0, 3) == "/9j") {
      //   this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64," + this.contact.contact_avatar);
      // } else {
      //   this.imagePath = this.contact.contact_avatar;
      // }

      this.editContactForm = this.formBuilder.group({
        contact_id: [this.contact.contact_id],
        contact_first_name: [this.contact.contact_first_name],
        contact_last_name: [this.contact.contact_last_name],
        contact_avatar: [this.contact.contact_avatar],
        contact_email: [this.contact.contact_email],
        contact_favorite: [this.contact.contact_favorite],
        contact_phone: this.formBuilder.array(this.getContactNumbersAsFormGroups())
      });

      // set contactlist to the form control containing contacts
      this.contactList = this.editContactForm.get("contact_phone") as FormArray;
    });
  }
  private getContactNumbersAsFormGroups(): FormGroup[] {
    //check if user phone number exist, if yes show them in input, if not show empty input
    let inputs: FormGroup[] = [];
    if (this.contact.contact_phone) {
      for (let i = 0; i < this.contact.contact_phone.length; i++) {
        inputs.push(
          this.formBuilder.group({
            label: [this.contact.contact_phone[i].label],
            value: [this.contact.contact_phone[i].value]
          })
        );
      }
    } else {
      inputs.push(this.getEmptyContactNumberForm());
    }
    return inputs;
  }

  private getEmptyContactNumberForm(): FormGroup {
    return this.formBuilder.group({
      label: [""],
      value: [""]
    });
  }

  // add a contact form group
  addContactNumber() {
    this.contactList.push(this.getEmptyContactNumberForm());
  }
  // remove contact from group
  removeContactNumber(index) {
    this.contactList.removeAt(index);
  }
  get contactFormGroup() {
    return this.editContactForm.get("contact_phone") as FormArray;
  }
  updateForm() {
    this.CrudService.editForm(this.editContactForm.value);
    this.router.navigate(["/details", this.contact.contact_id]);
  }
  onDelete(index: number) {
    this.CrudService.onDelete(index, this.getContact);
    this.router.navigate([""]);
  }
  goBack() {
    this.location.back();
  }

  //function for convert img to base64 and set to contact_avatar value

  // handleFileSelect(evt) {
  //   var files = evt.target.files;
  //   var file = files[0];
  //   if (files && file) {
  //     var reader = new FileReader();

  //     reader.onload = this._handleReaderLoaded.bind(this);

  //     reader.readAsBinaryString(file);
  //   }
  // }

  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  //   this.editContactForm.value.contact_avatar = this.base64textString;
  // }
}
