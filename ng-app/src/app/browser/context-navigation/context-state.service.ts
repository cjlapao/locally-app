import { Injectable, computed, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ContextBackendService } from '../../shared/contexts-backend.service';
import { LocationType } from '../../context/new-context-wizard-dialog/location-page/location-type';

export interface Context {
  id: string;
  active: boolean;
  name: string;
  enabled: boolean;
  valid: boolean;
  location: string;
  type: LocationType;
}

@Injectable({
  providedIn: 'root',
})
export class ContextStateService {
  contexts = signal<Array<Context> | null>(null);

  activeContextId = signal<string | null>(null);

  activeContext = computed(() => {
    const contexts = this.contexts();
    const activeContextId = this.activeContextId();

    if (!contexts || contexts.length === 0) {
      return null;
    } else {
      if (!activeContextId) {
        return null;
      } else {
        return contexts.find((context) => context.id === activeContextId);
      }
    }
  });

  constructor(private contextService: ContextBackendService) {
    this.loadContexts();
  }

  private async loadContexts() {
    this.contexts.set(
      await lastValueFrom(this.contextService.getAllContexts()),
    );
    const contexts = this.contexts();
    if (contexts) {
      this.setActiveContext(contexts[0].id);
    }
  }

  setActiveContext(id: string) {
    this.activeContextId.set(id);
  }
}
