import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  // To avoid confusion: The ActivatedRoute object we injected will give us access to the id passed in the URL => Selected User
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.user =  {
      // access to properties here which i defined in my route parameters. which is 'users/:id/:name' in appRoutes: Routes
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
  }

}
