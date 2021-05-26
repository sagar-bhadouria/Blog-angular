import { Component, OnInit, Output } from '@angular/core';
import { Blog } from 'src/app/interfaces/Blog';
import { BlogService } from '../../services/blog.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService
      .getAllBlogs()
      .subscribe((blogs) => (this.blogs = blogs.blogs));
  }

  deleteBlog(blog: Blog) {
    this.blogService.deleteBlog(blog?._id).subscribe((data) => {
      this.ngOnInit();
    });
  }
}
