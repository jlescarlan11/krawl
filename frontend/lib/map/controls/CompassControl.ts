import maplibregl from 'maplibre-gl';

export interface CompassControlOptions {
  pitch3D?: number;
  pitch2D?: number;
  animationDuration?: number;
  onToggle?: (is3D: boolean) => void;
}

export class CompassControl implements maplibregl.IControl {
  private _map?: maplibregl.Map;
  private _container?: HTMLDivElement;
  private _button?: HTMLButtonElement;
  private options: Required<CompassControlOptions>;

  constructor(options: CompassControlOptions = {}) {
    this.options = {
      pitch3D: options.pitch3D ?? 60,
      pitch2D: options.pitch2D ?? 0,
      animationDuration: options.animationDuration ?? 1000,
      onToggle: options.onToggle ?? (() => {}),
    };
  }

  onAdd(map: maplibregl.Map): HTMLElement {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';

    this._button = document.createElement('button');
    this._button.className = 'maplibregl-ctrl-compass';
    this._button.type = 'button';
    this._button.setAttribute('aria-label', 'Toggle 3D view and reset bearing to north');
    this._button.title = 'Toggle 3D View';

    const icon = this.createCompassIcon();
    this._button.appendChild(icon);
    this._button.onclick = () => this.toggle();

    this._container.appendChild(this._button);
    return this._container;
  }

  onRemove(): void {
    this._container?.parentNode?.removeChild(this._container);
    this._map = undefined;
    this._button = undefined;
  }

  private createCompassIcon(): HTMLSpanElement {
    const icon = document.createElement('span');
    icon.className = 'maplibregl-ctrl-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<svg width="29" height="29" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="m 10.5,14 a 4,4 0 1 0 8,0 a 4,4 0 1 0 -8,0 z m 4,-1.5 a 1.5,1.5 0 1 1 0,3 a 1.5,1.5 0 1 1 0,-3 z M 14.5,7 L 12,11 l 5,0 z" />
    </svg>`;
    return icon;
  }

  private toggle(): void {
    if (!this._map) return;

    const currentPitch = this._map.getPitch();
    const newIs3D = currentPitch === this.options.pitch2D;
    const newPitch = newIs3D ? this.options.pitch3D : this.options.pitch2D;

    this._map.easeTo({
      bearing: 0,
      pitch: newPitch,
      duration: this.options.animationDuration,
    });

    this.options.onToggle(newIs3D);
  }

  public set3DView(is3D: boolean): void {
    if (!this._map) return;

    const targetPitch = is3D ? this.options.pitch3D : this.options.pitch2D;
    this._map.easeTo({
      bearing: 0,
      pitch: targetPitch,
      duration: this.options.animationDuration,
    });
  }
}