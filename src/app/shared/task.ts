import {Column} from './column';
import {Module} from './module';

export interface Task {
  name: string;
  description: string;
  column: Column;
  module: Module;
  _id?: string;
}
// the api returns only strings for module and column if we fetch all tasks!
// so we create a second interface type for tasks
export interface TaskAll {
  name: string;
  description: string;
  column: string;
  module: string;
  _id?: string;
}
