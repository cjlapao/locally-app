import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div
      class="ly-avatar"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.background]="bgColor()"
      [class.ly-avatar--square]="shape() === 'square' ? true : undefined"
      [style.color]="fgColor()"
      [style.fontSize.px]="fontSize()"
      [attr.aria-label]="name() || 'Avatar'"
      [attr.title]="name()"
      role="img"
    >
      <span class="ly-avatar__initials">{{ initials() }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        line-height: 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  // signal inputs
  name = input<string>('');
  size = input<number>(40);
  shape = input<string>('circle');

  // derived signals
  initials = computed(() => this.computeInitials(this.name() || ''));
  baseColor = computed(() => this.hashToRgb(this.name() || ''));
  bgColor = computed(() => this.rgbToHtml(this.baseColor()));
  fgColor = computed(() => this.getContrastTextColor(this.baseColor()));
  fontSize = computed(() => Math.max(10, Math.round(this.size() * 0.42)));

  /**
   * Computes initials from a name string.
   * - For empty names, returns '?'.
   * - For single-word names, returns up to first two letters.
   * - For multi-word names, returns first letter of first and last word.
   */
  private computeInitials(name: string): string {
    // Normalize whitespace and trim
    const n = (name || '').trim().replace(/\s+/g, ' ');
    if (!n) return '?';

    const parts = n.split(' ');
    if (parts.length === 1) {
      // Single word: take up to first two letters
      return parts[0].slice(0, 2).toUpperCase();
    }

    // Multi-word: take first letter of first and last word
    const first = parts[0][0] || '';
    const last = parts[parts.length - 1][0] || '';
    return `${first}${last}`.toUpperCase();
  }

  private hashToRgb(str: string): { r: number; g: number; b: number } {
    let hash = 0;
    const s = str || 'avatar';
    for (let i = 0; i < s.length; i++) {
      hash = ((hash << 3) - hash + s.charCodeAt(i)) | 0;
    }
    const hue = ((hash % 360) + 360) % 360;
    const saturation = 45;
    const lightness = 55;

    return this.hslToRgb(hue, saturation, lightness);
  }

  private rgbToHtml(rgb: { r: number; g: number; b: number }): string {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  private getContrastTextColor(color: {
    r: number;
    g: number;
    b: number;
  }): string {
    return this.relativeLuminance(color.r, color.g, color.b) > 0.5
      ? '#000'
      : '#fff';
  }

  private hslToRgb(
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  private relativeLuminance(r: number, g: number, b: number): number {
    const srgb = [r, g, b]
      .map((v) => v / 255)
      .map((v) =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }
}
