import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';
import {VIEW_CORE_NAME, TH_CORE_NAME,} from 'ng/definition';
import {GRID_PREFIX} from 'core/definition';
import {ViewCoreService} from "../view/view-core.service";
import {RootService} from "../root.service";
import {TemplateCacheService} from "../../services/template-cache.service";

export class ThCoreContext {
  constructor(public $implicit: ThCoreDirective) {
  }

  get $view() {
    return this.$implicit.$view;
  }
}

@Directive({
  selector: '[q-grid-core-th]'
})
export class ThCoreDirective implements OnInit {
  @Input('q-grid-core-row-index') rowIndex: number;
  @Input('q-grid-core-column-index') columnIndex: number;
  private element: HTMLElement = null;

  constructor(public $view: ViewCoreService,
              private templateCache: TemplateCacheService,
              private viewContainerRef: ViewContainerRef,
              element: ElementRef) {
    this.element = element.nativeElement.parentElement;
  }

  ngOnInit() {
    const column = this.column;
    const element = this.element;

    element.classList.add(`${GRID_PREFIX}-${column.key}`);
    element.classList.add(`${GRID_PREFIX}-${column.type}`);
    if (column.hasOwnProperty('editor')) {
      element.classList.add(`${GRID_PREFIX}-${column.editor}`);
    }

    const context = new ThCoreContext(this);
    const template = this.templateCache.get('head.cell.text.tpl.html');
    this.viewContainerRef.createEmbeddedView(template, context);
  }

  get column() {
    return this.row[this.columnIndex].model;
  }

  get row() {
    return this.$view.head.rows[this.rowIndex];
  }
}