import { Component, OnInit } from "@angular/core";
import { GetUsers } from "@calorie-count/requests";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: Observable<GetUsers.Users[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.users = this.apollo
      .watchQuery<GetUsers.Query>({
        query: gql`
          users {
            recipes {
              ingredients {
                title
              }
            }
          }
      `
      })
      .valueChanges.pipe(map(result => result.data.users));
  }
}
