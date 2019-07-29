import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../shared/module.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'kb-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.css']
})
export class ModuleDetailsComponent implements OnInit {
  formData = {
    name: ''
  };

  constructor(
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
  saveModule() {
    this.moduleService
      .addModule(this.formData)
      .subscribe(module => {
        console.log('Speichern erledigt');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
