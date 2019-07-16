import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KanbanBoardComponent} from './kanban-board/kanban-board.component';
import {ColumnDetailsComponent} from './column-details/column-details.component';
import {ModuleDetailsComponent} from './module-details/module-details.component';
import {TaskDetailsComponent} from './task-details/task-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/kanban-board', pathMatch: 'full' },
  { path: 'kanban-board', component: KanbanBoardComponent},
  { path: 'column-add', component: ColumnDetailsComponent},
  { path: 'module-add', component: ModuleDetailsComponent},
  { path: 'task-add', component: TaskDetailsComponent},
  { path: 'task/:id', component: TaskDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
