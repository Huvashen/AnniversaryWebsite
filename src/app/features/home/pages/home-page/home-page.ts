import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { AnimationService } from '../../../../core/animations/animation.service';
import { SiteHeader } from '../../../../shared/layout/site-header/site-header';
import { Memory } from '../../../../shared/models/memory.model';
import { FEATURED_MEMORY, MEMORY_ROWS } from '../../../memories/data-access/memory-catalog';
import { MemoryRow } from '../../../memories/ui/memory-row/memory-row';
import { MemoryViewer } from '../../../memories/ui/memory-viewer/memory-viewer';

@Component({ selector: 'app-home-page', imports: [SiteHeader, MemoryRow, MemoryViewer], templateUrl: './home-page.html', styleUrl: './home-page.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class HomePage implements AfterViewInit {
  private readonly animations = inject(AnimationService);
  readonly featured = FEATURED_MEMORY;
  readonly rows = MEMORY_ROWS;
  readonly selectedMemory = signal<Memory | null>(null);
  ngAfterViewInit(): void { this.animations.reveal('.hero-item'); }
  @HostListener('document:keydown.escape') closeMemory(): void { this.selectedMemory.set(null); document.body.style.overflow = ''; }
  openMemory(memory: Memory): void { this.selectedMemory.set(memory); document.body.style.overflow = 'hidden'; }
  scrollToMemories(): void { document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' }); }
}
