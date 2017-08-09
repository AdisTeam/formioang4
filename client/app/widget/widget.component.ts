import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Widget } from './widget';
import {FormBuilderComponent} from '../form-builder/form-builder.component';

//services imports



@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
//  providers: [FormBuilderComponent]
})
export class WidgetComponent implements OnInit {

  //public submitted:boolean = false;
  @Input() widget: Widget;
  @Input() index: number;
  // @Output() onkeyup = new EventEmitter<boolean>();
  // @Output() fielddelete = new EventEmitter<boolean>();

  // eventHandler(value: any) {
  //   this.onkeyup.emit(value);
  // }
  //
  // delete (id :any) {
  //   this.fielddelete.emit(id);
  // }

  constructor(
    private formBuilderComponent: FormBuilderComponent
  ){
  }

  ngOnInit() {
    console.log("int widgComp");
    this.widget.submitted=true;

    this.widget.name=this.widget.type+String(this.index);
  }

delete() {
 //this.formBuilderComponent.delete(this.index)
 //console.log(widget);
 this.formBuilderComponent.targetList.splice(this.index,1);
 //console.log(this.formBuilderComponent.targetList);
}





//
// toggle(){
// if(this.formBuilderComponent.targetList[this.index].editEnable===true){
//   this.formBuilderComponent.targetList[this.index].editEnable=false;
// }else if(this.formBuilderComponent.targetList[this.index].editEnable===false){
//   this.formBuilderComponent.targetList[this.index].editEnable=true;
// }



toggle(){
if(this.widget.editEnable===true){
  this.widget.editEnable=false;
}else if(this.widget.editEnable===false){
  this.widget.editEnable=true;
}

}

}
