import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  public id = -1;
  public todo: Todo;
  public userName = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoDataService,
    private basicAuthenticationService: BasicAuthenticationService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userName = this.basicAuthenticationService.getAuthenticatedUser();
    this.todo = new Todo(this.id, '', false, new Date(), this.userName);
    if (this.id != -1) {
      this.todoService.retrieveTodo(this.userName, this.id).subscribe(data => {
        this.todo = data;
      }, error => console.error(error));
    }
  }

  public saveTodo(): void {
    this.todo.userName = this.userName;
    if (this.id == -1) {
      this.todoService.createTodo(this.userName, this.todo).subscribe(data => {
        this.router.navigate(['todos']);
      }, error => console.error(error));
    } else {
      this.todoService.updateTodo(this.userName, this.id, this.todo).subscribe(data => {
        this.router.navigate(['todos']);
      }, error => console.error(error));
    }
  }

  public isValidDescription(): boolean {
    return this.todo.description.trim().length > 0;
  }

}
