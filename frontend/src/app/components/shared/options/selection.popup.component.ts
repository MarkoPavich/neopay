import { Component, Input } from '@angular/core';

@Component({
  selector: 'selection-popup-menu',
  template: `
    <div
      class="content-container"
      tabindex="0"
    >
      <span class="span-full-width">Filter by status</span>
      <span class="span-short">Filter</span>
      <img src="/assets/icon-arrow-down.svg" alt="menu_arrow.img" />

      <div class="options-container" (click)="onInnerContainerClick($event)">
        <ul>
          <li>
            <div class="checkbox-option" (click)="onSelect()">
              <div
                class="checkbox-icon"
                [ngClass]="isChecked ? 'checkbox-checked' : ''"
              >
                <img *ngIf="isChecked" [src]="'assets/icon-check.svg'" alt="" />
              </div>
              <label for="">Draft</label>
              <input hidden />
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./selection.popup.component.scss'],
})
export class SelectionPopupComponent {
  @Input()
  private _isChecked: boolean = false;

  get isChecked(): boolean {
    return this._isChecked;
  }

  onInnerContainerClick($event: MouseEvent): void {
    $event.stopPropagation();
  }

  onSelect() {
    this._isChecked = !this._isChecked;
  }
}
