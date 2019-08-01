import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../shared/module.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'kb-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.css']
})
export class ModuleDetailsComponent implements OnInit {
  // initialise the form data
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
  // save a new module
  saveModule() {
    this.moduleService
      .addModule(this.formData)
      .subscribe(module => {
        console.log('Speichern des Moduls erledigt');
        // go back to the KanbanBoard
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
