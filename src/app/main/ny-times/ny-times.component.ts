import { Component, OnInit } from '@angular/core';
import { NyTimesAPIService } from '../../services/ny-times-api.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-ny-times',
  templateUrl: './ny-times.component.html',
  styleUrls: ['./ny-times.component.scss']
})
export class NyTimesComponent implements OnInit {

  dataObj: any[] | undefined;
  topStoriesDataObj: any[] | undefined;
  searchQuery: string = '';
  dropdownOptions = ['home', 'world', 'arts', 'automobiles', 'books', 'business', 'food', 'health', 'travel', 'theater', 'sports', 'science'];
  topStroyValue = 'home';
  articleErrorText = '';
  topStoriesErrorText = '';
  altImageUrl = '../../assets/angular.svg';

  constructor(private apiService: NyTimesAPIService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getArticles();
    this.getTopStories();
  }


  getArticles(param?: string): void {
    this.spinner.show();
    this.apiService.getArticles(param).subscribe((data) => {
      console.log(data);
      
      this.dataObj = data?.response?.docs;
      this.spinner.hide();
    },
      (err) => { 
        console.log(err?.message) 
        this.articleErrorText = err?.message;
        this.spinner.hide();

      });
  }

  getTopStories(): void {
    this.spinner.show();
    this.apiService.getTopStories(this.topStroyValue).subscribe(data => {
      this.topStoriesDataObj = data?.results.filter((item: any) => {
        if (item.item_type == 'Article') {
          return item;
        }
      });
      if (this.topStoriesDataObj!.length > 8) this.topStoriesDataObj = this.topStoriesDataObj?.slice(0, 8);
      console.log(this.topStoriesDataObj);
      this.spinner.hide();
    }, (err) => {
      this.topStoriesErrorText = err?.message
      this.spinner.hide();
    })

  }

  onSearch() {
    this.dataObj = [];
    this.getArticles(this.searchQuery);
  }


  onOptionChange(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    this.topStroyValue = (event.target as HTMLInputElement).value;
    this.getTopStories();
  }

}
