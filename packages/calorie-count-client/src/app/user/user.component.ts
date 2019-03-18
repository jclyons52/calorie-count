import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetUser, GetUserQuery } from "@calorie-count/requests";
import { Apollo } from "apollo-angular";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: GetUser.User;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params["id"]; // (+) converts string 'id' to a number

      this.apollo
        .watchQuery<GetUser.Query, GetUser.Variables>({
          query: GetUserQuery,
          variables: {
            userId
          }
        })
        .valueChanges.subscribe(result => {
          this.user = result.data.user;
        });
    });
  }
}
