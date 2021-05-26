import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  title: string = '';
  description: string = '';
  markdown: string = '';
  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit() {
    if (this.title === '' || this.markdown === '')
      return alert('Title and Markdown of a Blog Cannot Be Empty');

    this.blogService
      .createBlog(this.title, this.description, this.markdown)
      .subscribe((result) => {
        if (result.message === 'success') {
          this.router.navigateByUrl('/');
        } else {
          alert('Error while creating a Blog');
        }
      });
  }
}
