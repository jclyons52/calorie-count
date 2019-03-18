import { Component, OnInit } from "@angular/core";
import { GetUsers, GetUsersQuery } from "@calorie-count/requests";
import { Apollo } from "apollo-angular";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: Array<GetUsers.Users> = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<GetUsers.Query>({
        query: GetUsersQuery
      })
      .valueChanges.subscribe(result => {
        this.users = result.data.users;
      });
  }
}
