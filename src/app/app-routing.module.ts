import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AllContactsComponent } from "./all-contacts/all-contacts.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { AddNewComponent } from "./add-new/add-new.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  {
    path: "",
    component: AllContactsComponent
  },
  {
    path: "favorites",
    component: FavoritesComponent
  },
  {
    path: "add_new",
    component: AddNewComponent
  },
  {
    path: "details/:id",
    component: DetailsComponent
  },
  {
    path: "edit/:id",
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
