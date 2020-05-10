import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class ComponentBase implements OnDestroy {

    unsubscribe = new Subject<void>();

    ngOnDestroy(): void {
        this.unsubscribe.complete();
    }
}
