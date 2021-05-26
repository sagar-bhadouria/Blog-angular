import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  id: string = '';
  title: string = '';
  description: string = '';
  markdown: string = '';

  constructor(
    private blogService: BlogService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      console.log(this.id);
      this.blogService.getBlogById(this.id).subscribe((result) => {
        if (result.error === null) {
          console.log(result);
          this.id = result.blog._id;
          this.title = result.blog.title;
          this.description = result.blog.description;
          this.markdown = result.blog.markdown;
        } else {
          alert(result.error);
          this.router.navigateByUrl('/');
        }
      });
    });
  }
  onSubmit() {
    if (this.title === '' || this.markdown === '')
      return alert('Title and Markdown of a Blog Cannot Be Empty');

    this.blogService
      .updateBlog(this.id, this.title, this.description, this.markdown)
      .subscribe((result) => {
        if (result.message === 'success') {
          this.router.navigateByUrl('/');
        } else {
          alert('Error while updating a Blog');
        }
      });
  }
}
