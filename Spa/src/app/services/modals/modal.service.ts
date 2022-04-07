import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { modalsRegister } from 'src/app/components/modals/modals-register';
import { SessionService } from '../auth/session.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _activeModals = new BehaviorSubject([] as string[]);
  private _optionSelection$: Subject<string> = new Subject<string>();
  private _context: string = '';

  constructor(private sessionService: SessionService) {
    this.sessionService.isLoading.subscribe((isLoading: boolean) => {
      if (isLoading) {
        this.showSpinner();
      } else {
        this.hideSpinner();
      }
    });
  }

  get context(): string {
    return this._context;
  }

  set selection(selection: string) {
    this._optionSelection$.next(selection);
    this.closeModal();
  }

  get activeModals(): Observable<string[]> {
    return this._activeModals;
  }

  private showSpinner(): void {
    const activeModals = this._activeModals.value;
    activeModals.push(modalsRegister.spinner);

    this._activeModals.next(activeModals);
  }

  private hideSpinner(): void {
    const activeModals = this._activeModals.value.filter(
      (modal) => modal !== modalsRegister.spinner
    );

    this._activeModals.next(activeModals);
  }

  deleteDialog(deleteSubject: string): Observable<boolean> {
    this._context = deleteSubject;
    return this.showModal(modalsRegister.deleteConfirmation).pipe(
      map((selection: string) => {
        return JSON.parse(selection);
      })
    );
  }

  confirmationDialog(confirmationPredicate: string): Observable<boolean> {
    this._context = confirmationPredicate;
    return this.showModal(modalsRegister.confirmationDialog).pipe(
      map((selection: string) => {
        return JSON.parse(selection);
      })
    )
  }

  private showModal(modal: string): Observable<string> {
    const activeModals = this._activeModals.value;
    activeModals.push(modal);
    this._activeModals.next(activeModals);

    return this._optionSelection$.pipe(take(1));
  }

  closeModal(): void {
    const activeModals = this._activeModals.value.filter(
      (modal) => modal === modalsRegister.spinner
    );

    this._activeModals.next(activeModals);
  }
}
