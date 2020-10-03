import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrls: ['./content-loader.component.css']
})
export class ContentLoaderComponent implements OnInit {
  repeatcollection:number[];
  @Input() numberLines: number = 1;
  constructor() { }

  ngOnInit() {
    this.repeatcollection=[];
    for (var i = 0; i < this.numberLines; i++)
    {
      this.repeatcollection.push(i)
    }
  }

}
