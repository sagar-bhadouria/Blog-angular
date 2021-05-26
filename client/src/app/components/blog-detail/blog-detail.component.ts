import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from 'src/app/interfaces/Blog';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blog?: Blog;
  slug?: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';
      this.blogService
        .getBlogBySlug(this.slug)
        .subscribe((result) => (this.blog = result.blog));
    });
  }
  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }
}
