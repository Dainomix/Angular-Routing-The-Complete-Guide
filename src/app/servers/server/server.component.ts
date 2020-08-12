import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    // Using resolver way
    this.route.data
      .subscribe(
        (data: Data) => {
          // 'server' from resolve: {server: ServerResolver} in app.module.ts
          this.server = data['server'];
        }
      );

    // const id = +this.route.snapshot.params['id'];  // return as string '1', '2' ..., + operator convert our Id to a number
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params:Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // )
  }

  /**
   * To preserve that information,
   * we get a simple way of doing so. In the server component, where we navigate, we can pass another property
   * or add another property to his javascript object we use to configure our navigation
   * and here, we get the query params handling property
   * Now query params handling takes a string as a value and this could be merge, to merge our old query params
   * with any new we might add here. Now we don't andd any new ones,
   * So we can simply choose preserve instead and preserve which will overwrite the default behavior
   * which is simply drop them and make sure that the old ones are kept.
   * 
   * Now if we were to add new ones here, the old ones would actually overwrite the new ones,
   * so we should use merge in this case.
   * but since we don't add new ones, preserve should make sure that we don't lose them
   */
  onEdit() {
   this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}); 
  }

}
