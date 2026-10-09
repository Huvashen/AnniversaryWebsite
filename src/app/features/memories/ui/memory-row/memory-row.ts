import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Memory, MemoryRow as MemoryRowModel } from '../../../../shared/models/memory.model';
import { MemoryCard } from '../memory-card/memory-card';
@Component({
  selector: 'app-memory-row',
  imports: [MemoryCard],
  templateUrl: './memory-row.html',
  styleUrl: './memory-row.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryRow {
  readonly row = input.required<MemoryRowModel>();
  readonly memorySelected = output<Memory>();
}
