import { Component, OnInit } from '@angular/core';
import { InteriorIndividualRequest } from '../../Models/CustomersModels/Request/InteriorIndividualRequest/interiorIndividualRequest';

@Component({
  selector: 'app-interior-individual-request',
  templateUrl: './interior-individual-request.component.html',
  styleUrls: ['./interior-individual-request.component.css']
})
export class InteriorIndividualRequestComponent implements OnInit {
  request:InteriorIndividualRequest=new InteriorIndividualRequest();
  constructor() { }

  ngOnInit() {
  }

}
