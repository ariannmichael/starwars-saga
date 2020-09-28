import { Injectable } from '@angular/core';

/**
 * Service to handle modals
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];

    /** Add modal to array of active modals */
    add(modal: any) {
        this.modals.push(modal);
    }

    /** Remove modal from array of active modals */
    remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }

    /** Open modal specified by id */
    open(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.open();
    }

    /** Close modal specified by id */
    close(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
}