import { Directive,OnInit,OnDestroy } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Directive({selector: '[mySpy]'})
export class SpyDirective implements OnInit, OnDestroy {

  constructor(private logger: AdminService) { }

  ngOnInit()    { console.log("oninit");
}

  ngOnDestroy() { console.log("ondestroy");
}
}
