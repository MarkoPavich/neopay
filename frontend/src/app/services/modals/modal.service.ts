import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { modalsRegister } from 'src/app/components/modals/modals-register';
import { SessionService } from '../auth/session.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _activeModals = new BehaviorSubject([] as string[]);

  constructor(private sessionService: SessionService) {
    this.sessionService.isLoading.subscribe((isLoading: boolean) => {
      if (isLoading) {
        this.showSpinner();
      } else {
        this.hideSpinner();
      }
    });
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

  showModal(modal: string) {
    const activeModals = this._activeModals.value;
    activeModals.push(modal);

    this._activeModals.next(activeModals);
  }
}
