import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Memory } from '../../../../shared/models/memory.model';
@Component({ selector: 'app-memory-card', templateUrl: './memory-card.html', styleUrl: './memory-card.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class MemoryCard { readonly memory = input.required<Memory>(); readonly selected = output<Memory>(); }
