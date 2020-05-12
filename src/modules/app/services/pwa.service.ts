import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable()
export class PwaService {
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      }
    });
  }

  private askUserToUpdate() {
    return confirm("New version of app is available do you want to reload the page?");
  }
}
