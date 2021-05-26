import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from 'src/app/interfaces/Blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent implements OnInit {
  @Output() onDeleteBlog: EventEmitter<Blog> = new EventEmitter();
  @Input() blog?: Blog;
  constructor() {}

  ngOnInit(): void {}

  onDelete(blog: Blog) {
    this.onDeleteBlog.emit(blog);
  }
}
