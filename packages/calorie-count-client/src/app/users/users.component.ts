import { Component, OnInit } from "@angular/core";
import { GetUsers, GetUsersQuery } from "@calorie-count/requests";
import { Apollo } from "apollo-angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: GetUsers.Users[] = [];

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<GetUsers.Query>({
        query: GetUsersQuery
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        this.users = result.data.users;
      });
  }
}
