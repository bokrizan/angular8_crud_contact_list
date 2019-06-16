import { Component, OnInit } from "@angular/core";
import { ContactsCrudService } from "../contacts-crud.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  contactsFromStorage: any = [];
  favorite: any = [];
  favoriteList: any = [];
  constructor(private CrudService: ContactsCrudService, private router: Router) {
    this.contactsFromStorage = JSON.parse(localStorage.getItem("contactsListStorage"));
    this.favorite = this.contactsFromStorage.filter(x => x.contact_favorite == true);
  }

  ngOnInit() {}

  onDelete(index: number) {
    this.CrudService.onDelete(index, this.contactsFromStorage);
    location.reload();
  }

  selectFavorite(index: number) {
    this.CrudService.selectFavorite(index, this.contactsFromStorage);
  }
  goToFavorites() {
    this.router.navigate(["/favorites"]);
  }
  goToAll() {
    this.router.navigate([""]);
  }
}
