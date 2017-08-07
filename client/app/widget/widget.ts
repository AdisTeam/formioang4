import { Component, OnInit, Input } from '@angular/core';
import {AppComponent} from '../app.component';

export class Widget {

  name:string
  submitted:boolean=false;
  data: any;
  label: string;
  showEdit:boolean=true;
  label2:string[]=[];
  data2:boolean[]=[];
  required:boolean;
  placeholder:string="value";
  //index : number=0;
  editEnable: boolean;
  appComponent: AppComponent
  constructor(public type: string, public index?:number ) {
    this.name = this.type + String(index);

        //this.data="";
    if(this.type==='text'){ this.label= "Enter text"}
    if(this.type==='email'){ this.label= "Enter Email"}
    if(this.type==='number'){ this.label= "Enter number"}
    if(this.type==='date'){ this.label= "pick date"}
    if(this.type==='textarea'){ this.label= "Enter data"}
    if(this.type==='checkbox'){ this.label= "Enter Checkbox question";
        this.label2=['check1','check2'];
        this.data2=[false,false];
    //    this.data=this.label2;
      }
      if(this.type==='radio'){ this.label= "Enter Checkbox question,";
          this.label2=['input1','input2'];
        }
      this.editEnable=false;
    //his.name=  restype + String(resid);

  }

}
