import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";



interface Task {
  name: string;
  completed: boolean;
  id: number;
}



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})



export class TodoListComponent {
  todoForm: FormGroup;
  tasks: Task[] = [];
  filter: string = 'all';
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({ taskName: [''] });
    this.loadTasks();
  }


  addOrUpdateTask() {
    const taskName = this.todoForm.value.taskName.trim();
    if (!taskName) return;

    if (this.editingIndex === null) {
      let id = Math.floor(Math.random() * 1000);
      this.tasks.push({ name: taskName, completed: false, id });
    } else {
      this.tasks[this.editingIndex].name = taskName;
      this.editingIndex = null; // Reset editing mode
    }


    this.saveTasks();
    this.applyFilter();
    this.todoForm.reset();
  }



  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
    this.applyFilter();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.applyFilter();
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter() {
    let allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    switch (this.filter) {
      case 'active':
        this.tasks = allTasks.filter((task: { completed: any; }) => !task.completed);
        break;
      case 'completed':
        this.tasks = allTasks.filter((task: { completed: any; }) => task.completed);
        break;
      default:
        this.tasks = allTasks;
    }
  }

  editTask(index: number) {
    this.editingIndex = index;
    this.todoForm.patchValue({ taskName: this.tasks[index].name });
  }


  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }



  private loadTasks() {
    if (typeof localStorage !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  }


}
