import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../widget/widget';
import {FormBuilderComponent} from '../form-builder/form-builder.component';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.css']
})
export class WidgetEditorComponent implements OnInit {

  @Input() widget: Widget;

  constructor(private formBuilderComponent: FormBuilderComponent ){}

  ngOnInit() {
  }


  trackByIndex(index: any, item: any) {
   return index;
}
  removeSF(i){
    this.widget.label2.splice(i, 1);
    if (this.widget.type==='checkbox'){
    this.widget.data2.splice(i, 1);
  }

    console.log(this.formBuilderComponent.targetList);
  }
  append(){
    if( this.widget.type ==="checkbox"){
      this.widget.label2.push( "Check" + String(1 + this.widget.label2.length));
      this.widget.data2.push( false);
    }
    else{this.widget.label2.push( "Input" + String(this.widget.label2.length +1))}
  }

}
