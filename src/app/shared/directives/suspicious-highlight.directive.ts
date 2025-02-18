import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
@Directive({
  selector: '[appSuspiciousHighlight]',
})
export class SuspiciousHighlightDirective implements AfterViewInit, OnDestroy {
  @Input() appSuspiciousTransactionHighlight = 10000; // Default Value
  el = inject(ElementRef);
  renderer = inject(Renderer2);
  private gridApi: GridApi | null = null;
  private gridReadySubscription: Subscription | undefined;

  ngAfterViewInit() {
    this.gridReadySubscription = this.subscribeToGridReady();
  }

  private subscribeToGridReady(): Subscription {
    const agGridElement = this.el.nativeElement.querySelector('.ag-root');
    if (!agGridElement) {
      console.error(
        'Ag-Grid element not found. Make sure the directive is placed on the correct element.'
      );
      return Subscription.EMPTY;
    }

    return fromEvent(agGridElement, 'gridReady')
      .pipe(
        filter((event): event is GridReadyEvent => {
          console.log(event);
          return (event as GridReadyEvent).api !== undefined;
        })
      )
      .subscribe((event: GridReadyEvent) => {
        this.gridApi = event.api;
        this.applyHighlighting();
      });
  }

  private applyHighlighting() {
    //If use setTimeout and applyHighlighting is able to highlight the cell but breaking the application
    const rows = this.el.nativeElement.querySelectorAll('.ag-row');
    console.log(rows);
    console.log(this.appSuspiciousTransactionHighlight);
    rows.forEach((row: HTMLElement) => {
      const amountCell = row.querySelector('[col-id="amount"]');
      if (amountCell) {
        console.log(amountCell.textContent);
        const amount = parseFloat(amountCell.textContent || '0');
        if (amount >= this.appSuspiciousTransactionHighlight) {
          this.renderer.addClass(amountCell, 'suspicious-transaction');
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.gridReadySubscription) {
      this.gridReadySubscription.unsubscribe();
    }
  }
}
