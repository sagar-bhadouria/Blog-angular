import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:5000/blogs';
  constructor(private http: HttpClient) {}
  // It will return all the blogs from the server
  getAllBlogs(): Observable<any> {
    // console.log(this.http.get(this.apiUrl).pipe(map(result:Blog[])=>());
    return this.http.get<any>(this.apiUrl);
  }

  // It will create new blog
  createBlog(
    title: string,
    description: string,
    markdown: string
  ): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { title, description, markdown },
      httpOptions
    );
  }

  // Delete particular blog by its Id
  deleteBlog(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  // It will return blog by slug
  getBlogBySlug(slug: string): Observable<any> {
    const url = `${this.apiUrl}/${slug}`;
    return this.http.get(url);
  }
  // It will return blog for given Id
  getBlogById(id: string): Observable<any> {
    const url = `${this.apiUrl}/edit/${id}`;
    return this.http.get(url);
  }

  // It will update current blog by id
  updateBlog(
    id: string,
    title: string,
    description: string,
    markdown: string
  ): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { title, description, markdown }, httpOptions);
  }
}
