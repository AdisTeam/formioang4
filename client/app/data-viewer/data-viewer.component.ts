//@angular imports
import { Component, OnInit} from '@angular/core';
import {FormBuilderComponent} from '../form-builder/form-builder.component'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { FormsModule,FormControl, NgForm ,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

//other imports
import { Widget } from '../widget/widget';
import {WidgetComponent} from '../widget/widget.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import * as Fuse from 'fuse.js'


//services imports
import {FormShowService} from '../form-show/form-show.service';


@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.scss']
})
export class DataViewerComponent implements OnInit {
  public tableData: any;
  private arrCreator ={};
  private id;
  private ngarr;
  private qval;
  private fuseComp: Fuse;
  private fuseOpts: any;

  private settings = {
      columns: {

      }
    };


    private data = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz"
      },  // ... other rows here
      {
        id: 11,
        name: "Nicholas DuBuque",
        username: "Nicholas.Stanton",
        email: "Rey.Padberg@rosamond.biz"
      }
    ];

  constructor(
    private http: Http,
    private router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.id=this.route.params['value'].id
    this.fetchData();
    console.log('TABLEDATA');
    this.fuseOpts = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "author.firstName"
]
};
  this.fuseComp = new Fuse(this.AdvanceSearchArr, this.fuseOpts); // "list" is the item array

}


  fetchData() {
    this.http.post('/api/fetch', { id: this.id}).subscribe(
        res => {
          res.json();
          console.log(res.json());
         this.tableData = res.json();
        //return resproc;
                }

    );


       this.http.post('/api/getInfo',{ data: this.id}).subscribe(
         res => {res.json();

           let resProc = res.json();
           console.log(resProc);
           this.ngarr=resProc[0].ngarray;
           this.qval=resProc[0].quest;

     });

}
  tabledataFunc(): any{

    this.ngarr.forEach((item, i) =>
      this.settings.columns[item] = { title :  this.qval[i]}
     );

     return this.settings;

}

showHide:false;
title = 'app';
chooseType = '';
public queryData: any[] = [];
selected : boolean;

showSelected() {
      this.selected = !this.selected;
  }

  public AdvanceSearchArr: any[] = [{
		"companyName":"CTS",
		"name":"Rahul",
		"operator":"Does not contain",
		"value":"shankar",
		"gender":"male",
		"age":23
	},
	{
		"companyName":"TCS",
		"name":"Mukesh",
		"operator":"Does not contain",
		"value":"shankar",
		"gender":"male",
		"age":23
	},
	{
		"companyName":"CTS",
		"name":"Sarath",
		"operator":"Does not contain",
		"value":"shankar",
		"gender":"male",
		"age":23
	},
	{
		"companyName":"Wipro",
		"name":"Sudhir",
		"operator":"Does not contain",
		"value":"shankar",
		"gender":"male",
		"age":23
	},
];




//dropdown for select the type
  doSomething(event) {
    this.queryData.push({
      condition:'AND',
      name:event,
      operator:'Does not contain',
      value:''
    })
  }

//getquery button
  getFinalQuery (){
    alert(JSON.stringify(this.queryData));
    console.log(this.queryData);
  }

//delete each row of items
  delete(index) {
    this.queryData.splice(index, 1);
    console.log(this.queryData);
  }

  reset() {
    this.queryData = [];
  }

}
