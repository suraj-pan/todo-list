import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeleteModalComponent} from "../component/delete-modal/delete-modal.component";


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



export class TodoListComponent implements OnInit{
 public todoForm: FormGroup;
 private  tasks: Task[] ;
 public  filter: string ;
 public filteredTasks: Task[]  ;
 public  messages: string[] ;
 private editingIndex: number | null ;
  private dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({ taskName: [''] });
    this.tasks=[];
    this.filter ='all';
    this.filteredTasks = [];
    this.editingIndex = null;
    this.messages = [];
  }


  ngOnInit() {
    this.loadTasks();
    this.applyFilter(); // Apply filter on init
  }

  addOrUpdateTask() {
    const taskName = this.todoForm.value.taskName.trim();


    if (!taskName){
      alert("Task name cannot be empty! Please enter a valid task.");
      return;
    }

    if (this.editingIndex === null) {
      let id = Math.floor(Math.random() * 1000);
      this.tasks.push({ name: taskName, completed: false, id });
    } else {
      this.tasks[this.editingIndex].name = taskName;
      this.editingIndex = null;
    }

    this.saveTasks();
    this.applyFilter();
    this.todoForm.reset();
  }



  toggleTask(index: number) {
    this.filteredTasks[index].completed = !this.filteredTasks[index].completed;
    this.saveTasks();
    this.applyFilter();
  }



  deleteTask(id: number) {

    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(id => {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.applyFilter();
      }
    });


  }

  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter() {
    switch (this.filter) {
      case 'active':
        this.filteredTasks = this.tasks.filter((task) => !task.completed);
        this.updateMessages('active');
        break;
      case 'completed':
        this.filteredTasks = this.tasks.filter((task) => task.completed);
        this.updateMessages('completed');
        break;
      default:
        this.filteredTasks = [...this.tasks];
        this.updateMessages('all');
    }
  }

  updateMessages(filter: string) {
    this.messages = []; // Reset messages
    if (this.filteredTasks.length === 0) {
      if (filter === 'all') {
        this.messages.push('No Tasks', 'Add a new task!');
      } else if (filter === 'active') {
        this.messages.push('No Active Tasks');
      } else if (filter === 'completed') {
        this.messages.push('No Completed Tasks');
      }
    }
  }

  editTask(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
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
