import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ServersService } from './servers.service';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    /**
     * Unlike the routerLink, the navigate method doesn't know on which route you are currently on, so to say.
     * The routerLink always knows in which component it sits, in which components template 
     * and therefore it knows what the currently loaded route is.
     * */ 
    // this.router.navigate(['servers']);

    /**
     * To tell this where we currently are in, we have to pass 2nd argument to the navigate method
     */
    // this.router.navigate(['servers'], {relativeTo: this.route})
  }

}
