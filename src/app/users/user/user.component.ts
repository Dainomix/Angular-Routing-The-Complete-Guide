import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription
  // To avoid confusion: The ActivatedRoute object we injected will give us access to the id passed in the URL => Selected User
  constructor(private route:ActivatedRoute) { }

  /**
   * We might simply use the snapshot
   * because if i know my component will 100% of the time be recreated when it is reached,
   * because there's no other way of reaching it, there is no way of reaching it whilist being on that component
   * if i know that, i don't need to subscribe.
   * In all other cases, make sure to use this approach to get informed about any changes in my route parameters.
   */

  ngOnInit() {
    this.user =  {
      // access to properties here which i defined in my route parameters. which is 'users/:id/:name' in appRoutes: Routes
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
