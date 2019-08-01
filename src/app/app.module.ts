import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ColumnDetailsComponent } from './column-details/column-details.component';
import { ModuleDetailsComponent } from './module-details/module-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatIconModule, MatSnackBarModule, MatButtonModule, MatGridListModule, MatDividerModule, MatCardModule, MatListModule } from '@angular/material';
import { ModuleRowComponent } from './module-row/module-row.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    KanbanBoardComponent,
    TaskDetailsComponent,
    ColumnDetailsComponent,
    ModuleDetailsComponent,
    ModuleRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
