import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { News } from './../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  selectedNews: News;
  news: News[] = [];
  url = '/news';

  constructor(private httpClient: HttpClient) {
    this.selectedNews = new News();
   }

   getNews() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

  postNews(title: string, description: string, link: string, image: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('image', image);

    return this.httpClient.post<News>(environment.API_URL + this.url, formData, { reportProgress: true, observe: 'events'});
  }

  // tslint:disable-next-line: variable-name
  putNews(_id: string, title: string, description: string, link: string, image: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('image', image);

    return this.httpClient.put<News>(environment.API_URL + this.url + `/${_id}`, formData);
  }

  // tslint:disable-next-line: variable-name
  deleteNews(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }
}
