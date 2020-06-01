import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) {}

  public retrieveAllTodos(userName: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_URL}/users/${userName}/todos`);
  }

  public retrieveTodo(userName: string, id: number): Observable<Todo> {
    return this.http.get<Todo>(`${API_URL}/users/${userName}/todos/${id}`);
  }

  public createTodo(userName: string, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${API_URL}/users/${userName}/todos`, todo);
  }

  public updateTodo(userName: string, id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${API_URL}/users/${userName}/todos/${id}`, todo);
  }

  public deleteTodo(userName: string, id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/users/${userName}/todos/${id}`);
  }
}
