import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../../core/services/access.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly access = inject(AccessService);
  private readonly router = inject(Router);
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  @HostListener('window:scroll') onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
  scrollTo(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      void this.router.navigate(['/browse'], { fragment: id }).then(() => {
        window.setTimeout(
          () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
          0,
        );
      });
    }
    this.menuOpen.set(false);
  }
  openMemories(): void {
    this.menuOpen.set(false);
    void this.router.navigate(['/memories']);
  }
  exit(): void {
    this.access.lock();
    void this.router.navigate(['/welcome']);
  }
}
