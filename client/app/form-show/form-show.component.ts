//@angular module imports
import { Component, OnInit} from '@angular/core';
//import {FormBuilderComponent} from '../form-builder/form-builder.component'
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


//services imports
import {FormShowService} from '../form-show/form-show.service';



@Component({
  selector: 'app-form-show',
  templateUrl: './form-show.component.html',
  styleUrls: ['./form-show.component.css'],
  providers: [FormShowService]

})
export class FormShowComponent implements OnInit {
  public id:string;
  public code:string;
   private modArr: string[]=[];
   private questions : string[]=[];
   public clinker: string = 'api/getInfo/';
   public widgetData:Widget[];
   show:boolean;

  constructor(
    private http: Http,
    private router: Router,
    private route : ActivatedRoute
    ) { //constructor
  //    this.formsh=new FormShowService;

  }



  ngOnInit(){
      console.log('this.Code')
      console.log(this.route.params['value'].id);
      this.id=this.route.params['value'].id

        this.getID();
  }

//define Methods Below

getID(){
  let jsonData : JSON;
  jsonData=JSON.parse('{"data" :"'+ this.id +'"}');

  return this.http.post('/api/getInfo', jsonData).subscribe(
     res => {res.json();
       console.log(res.json());
       let resProc = res.json();
       console.log(resProc);
       this.code=resProc[0].script;
       this.modArr=resProc[0].ngarray;
       this.questions=resProc[0].quest;
       //this.editQue=
       this.widgetData= this.cleanWidgets(resProc[0].widgetData);
       console.log(this.widgetData);

       //let sample= //document.getElementById('sample').getAttribute('type');
    //   console.log(sample);
       /**
       the above should log a string containing the req. html components
       **/
      });

}

cleanWidgets( widReq: string[]):Widget[] {
  let widgetList:Widget[]=[];
  for(let widget of widReq ){

    let wid = new Widget(JSON.parse(widget).type);
    wid.showEdit=false;
    wid.name=JSON.parse(widget).name;
    wid.type=JSON.parse(widget).type;
    wid.submitted=JSON.parse(widget).submitted;
  //  data: widget.data,
    wid.label= JSON.parse(widget).label;
    wid.label2=JSON.parse(widget).label2;
    widgetList.push(wid);
  }
  return widgetList;
}

formSubmit() {
  let dataSub =[];

 for(let i of this.widgetData){
   if (i.type==='checkbox') {
     for(let j of i.data2)
     {dataSub.push(j);}
   } else {
     dataSub.push(i.data);
} //else
}//for loop

let arrCreator ={} ;

this.modArr.forEach((item, i) => {
  arrCreator[item] = dataSub[i];
});


console.log(typeof arrCreator);
console.log(arrCreator);

return this.http.post('/api/insert', { data :arrCreator, id: this.id}).subscribe(
    res => {res.json();
      console.log(res.json());
});
}

}
