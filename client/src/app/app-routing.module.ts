import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
  },
  {
    path: 'blog/:slug',
    component: BlogDetailComponent,
  },
  {
    path: 'blog-new',
    component: CreateBlogComponent,
  },
  {
    path: 'blog-edit/:id',
    component: EditBlogComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
