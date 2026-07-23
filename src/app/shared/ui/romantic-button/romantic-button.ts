import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-romantic-button',
  template: `
    <button
      class="rounded-full bg-rose-300 px-6 py-3 font-semibold text-rose-950
             shadow-lg shadow-rose-950/20 transition hover:-translate-y-0.5
             hover:bg-rose-200 focus-visible:outline-2 focus-visible:outline-offset-4
             focus-visible:outline-rose-200"
      type="button"
      (click)="pressed.emit()"
    >
      {{ label() }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RomanticButton {
  readonly label = input.required<string>();
  readonly pressed = output<void>();
}
