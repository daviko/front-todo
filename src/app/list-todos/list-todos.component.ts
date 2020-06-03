import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date,
    public userName: string) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  public message: string;
  public userName = '';
  public selectedTodo: Todo;
  public todos: Todo[] = [
    /*new Todo(1, 'Learn to dance', false, new Date()),
    new Todo(2, 'Learn to code', true, new Date()),
    new Todo(3, 'Learn to play', false, new Date())*/
  ];

  constructor(private router: Router,
    private loadingService: NgxSpinnerService,
    private todoService: TodoDataService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
    this.userName = this.basicAuthenticationService.getAuthenticatedUser();
    this.selectedTodo = new Todo(-1, '', false, null, '');
    this.retrieveAllTodos();
  }

  public retrieveAllTodos(): void {
    this.loadingService.show();
    this.todoService.retrieveAllTodos(this.userName).subscribe(response => {
      this.todos = response;
      this.message = null;
      this.loadingService.hide();
    }, error => {
      console.error(error);
      this.loadingService.hide();
    });
  }

  public deleteTodo(id: number): void {
    this.loadingService.show();
    this.todoService.deleteTodo(this.userName, id).subscribe(response => {
      this.message = `Delete todo ${id} successful`;
      this.selectedTodo = new Todo(-1, '', false, null, '');
      this.loadingService.hide();
      this.retrieveAllTodos();
    }, error => {
      console.error(error);
      this.loadingService.hide();
    });
  }

  public updateTodo(id: number): void {
    this.router.navigate(['todos', id]);
  }

  public addTodo(): void {
    this.router.navigate(['todos', -1]);
  }

}
