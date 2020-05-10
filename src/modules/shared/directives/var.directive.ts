import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appVar]'
})
export class VarDirective {

  @Input()
  set appVar(context: any) {
    this.context.$implicit = this.context.appVar = context;
    this.updateView();
  }

  context: any = {};

  constructor(private vcRef: ViewContainerRef, private tmpRef: TemplateRef<any>) { }

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.tmpRef, this.context);
  }
}
