import { Component, OnInit } from '@angular/core';
import { Widget } from '../widget/widget';
import {WidgetComponent} from '../widget/widget.component';
import {Http} from '@angular/http'
import {FormShowService} from '../form-show/form-show.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  providers: [FormShowService]
})
export class FormBuilderComponent implements OnInit {
  sourceList : string[] = [
    'text',
    'email',
    'number',
    'date',
    'textarea',
    'checkbox',
    'radio'

  ];
  targetList: Widget[] = [];
  id: number;
  jsonData: Widget[];
  code: any;
  ngOnInit(){
    this.id=0;
  }

  constructor(private formShowService: FormShowService, private router:Router){}

  addTo($event: any) {
      console.log(this.id);
      console.log('addEvent');
      this.targetList.push(new Widget($event.dragData, this.id));
      console.log(this.targetList);

  //    this.targetList[this.targetList.length -1].submitted=true;
    //  this.targetList[this.id].restype = this.targetList[this.id].type + String(this.id);
      console.log(this.targetList[this.id]);
    //  console.log(this.id);
      //this.id=this.id +1;
      //this.targetList[this.targetList.length -1].data = "";

  };

   convert() {

    this.jsonData= (this.targetList);
      console.log(this.jsonData);
      //  let response=  this.formShowService.display(this.jsonData);

          this.formShowService.display(this.jsonData);
          //this.router.navigate('show'); //routing
  }
  addusingClick(item) {
        this.targetList.push(new Widget(item, this.id));
    }

}
