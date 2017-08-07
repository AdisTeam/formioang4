//@angular modules
import {Component, Injectable, OnInit } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { Router,NavigationExtras } from '@angular/router';
import { FormsModule,FormGroup,NgForm ,ReactiveFormsModule } from '@angular/forms';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//modules
import { json } from "body-parser";

//components
import { Widget } from '../widget/widget';



@Injectable()
export class FormShowService implements OnInit {
  private displayVal: string;
  private code:string='';
  private sample:any;
  private value:string[]=[];

  private que: string[]=[];
  //private mongo: Mongo;
private ngarr:string[]=[];

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

constructor(
  private http: Http,
  private router: Router,
){

   }


  ngOnInit(){
    //this.Connect()
  }

   encodeWidg(widgetList: Widget[]): string[] {
     let jsonArr=[];
     for(let widget of widgetList  ){
    let stringPusher=   {
      name:widget.name,
      type:widget.type,
      submitted:widget.submitted,
    //  data: widget.data,
      label: widget.label,
      label2:widget.label2,
//      required:widget.required,
      placeholder:widget.placeholder
    }
    jsonArr.push(JSON.stringify(stringPusher));
  };


console.log('JSONARRAY');
for(let item of jsonArr){
  console.log(item);
}
console.log(jsonArr);
return jsonArr;
}

//html code gen below
  display(value: Widget[]){
    console.log(value);
    this.code='';
    this.que=[];
    this.ngarr=[];
    let basic= '{{<form #EntForm=ngForm ngSubmit=registerUser(EntForm) >';
    this.code= this.code+basic;


    value.forEach((item, index) => { //for loop
    //  this.code=[]
      switch (item.type) {
            case 'text':
              console.log('TEXT');
                var addon = '<div class=list-group-item> <span><label>' + item.label + '</label> '+
                ': <input class=form-control type =text placeholder=' + item.placeholder +
                ' [(ngModel)]='+item.type + index+' name='+item.type + index+'> </span> </div>  {{'+item.type+ index+'}}' ;
                this.ngarr.push(item.type + index);
                this.que.push(item.label);
                this.code= this.code+addon;
                break;

            case 'checkbox':
                var duplicator = "";
                for (var j = 0; j < item.label2.length; j++) {
                    duplicator = duplicator + '<span><label>' + item.label2[j] +'</label>' +
                     ' : <input type=checkbox [(ngModel)]= ' + item.type + index + 's' + j +
                      ' ng-checked=false><br></span>';
                    //ngarray.push(item.type + item.index + j);
                    this.que.push(item.label + ', ' + item.label2[j]);
                    this.ngarr.push(item.type + item.index + j);
                }
                var addon = ' <div class=list-group-item><span><label>' + item.label + ' </label></span><br>'
                + duplicator + ' </div>';
               this.code = this.code + addon;
                break;

            case 'radio':
                var duplicator = "";
                for (var j = 0; j < item.label2.length; j++) {
                    duplicator = duplicator + '<span><label>' + item.label2[j] + '</label> '+
                    ' : <input type=radio [(ngModel)]= ' + item.type + index + 's' + j +
                     ' name =' + item.type + index + ' value= ' + item.label2[j] + '><br></span>';
                    console.log("radio :  " + item.label2[j]);


                }
                var addon = ' <div class=list-group-item><span><label>' + item.label + ' </label></span><br>'
                + duplicator + ' </div>';
               this.code = this.code + addon;
               this.que.push(item.label);
               this.ngarr.push(item.label)
                break;

        }

    }); //FORLOOP ENDS here
  //  console.log(EntForm);
    this.code= this.code +'<br><button (click)= this.http.post(/api/getInfo,EntForm)>submit</button></form>';
    console.log(this.code);
    console.log("this.que : " + this.que);

    console.log("CODE  " + this.code)
    this.options.body = this.code;
    this.options.url="/api/formgen";
    this.options.method='POST';
    this.options.headers.append('Content-Type', 'application/json');

//    console.log(this.options)
    console.log(typeof value)
    this.value= this.encodeWidg(value);
    console.log(this.value);

    let jsonData={
      data: this.code,
      ques: this.que,
      jsonvals:this.value,
      ngarr: this.ngarr
    }

//    console.log(this.value);
    // jsonData=JSON.parse(
    //   '{"data" : " '+  this.code +
    //   '" ,"ques" : " '+ this.que +
    //   '","jsonvals" : " '+  this.value +
    //   '" ,"ngarr" : " '+  this.ngarr +
    //   '" }'
    // );


    console.log(typeof jsonData);
    return this.http.post('/api/formgen', jsonData).subscribe(
       res => {
         res.json();
         console.log(res.json());
               this.router.navigate(['show', {id: res.json()._id}]);
             });

    // return this.http.post( '/api/formgen',jsonData).subscribe(
    //   res => {console.log(res);
    //           this.router.navigate(['show']);}



    // "api/" ensures sends data towards the server
  }

clicked(form: NgForm){
  console.log('fuckyeee');
  //this.formShowComponent.registerUser(form);

}

  delete(ind){
  //  this.formBuilderComponent.targetList.splice(ind,1);

}


}
