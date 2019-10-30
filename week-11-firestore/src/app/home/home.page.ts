import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  todos: Todo[];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  remove(id: string) {
    this.todoService.removeTodo(id);
  }

}
