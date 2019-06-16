import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContactsCrudService } from "../contacts-crud.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  contact: any[] = [];
  getContact: any[] = [];
  id: number;
  sub: any;
  constructor(private route: ActivatedRoute, private location: Location, private CrudService: ContactsCrudService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"];
      this.getContact = JSON.parse(localStorage.getItem("contactsListStorage"));
      this.contact = this.getContact.find(x => x.contact_id === this.id);
    });
  }
  selectFavorite(index: number) {
    //funkcija koja oznacava true/false za favorite gleda prema index-u, zato sam trebao pronaći index odabranog kontakta prema ID-u
    let getIndex = this.getContact.findIndex(x => x.contact_id === index);
    this.CrudService.selectFavorite(getIndex, this.getContact);
  }

  goBack() {
    this.location.back();
  }
}
