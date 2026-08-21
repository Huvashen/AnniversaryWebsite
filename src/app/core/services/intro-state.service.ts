import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IntroStateService {
  private readonly completed = signal(false);
  readonly hasPlayed = this.completed.asReadonly();
  markComplete(): void {
    this.completed.set(true);
  }
}
