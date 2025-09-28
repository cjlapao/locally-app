import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';

import { AvatarComponent } from '../shared/components/avatar.component';
import { LoadStatePipe } from '../shared/pipes/load-state.pipe';

@Component({
  selector: 'app-projects-page',
  imports: [AsyncPipe, LoadStatePipe, AvatarComponent],
  template: `
    <div
      class="flex flex-col items-center justify-center overflow-auto bg-locally-background"
    >
      <div
        class="flex w-full max-w-[800px] flex-col items-start gap-[32px] px-[50px] py-[100px]"
      >
        <div class="flex flex-col gap-[4px]">
          <div class="text-2xl font-medium">Projects</div>
          <div class="text-locally-caption-text">
            Select existing project or create a new one.
          </div>
        </div>

        @if (projects$ | loadState | async; as projects) {
          @if (projects.loading) {
            <p>Loading...</p>
          }

          @if (projects.error) {
            <div class="ly-alert ly-alert--error">
              Unable to load the projects list.
            </div>
          } @else {
            <div class="flex flex-col gap-[16px]">
              <button
                class="ly-button ly-button--text w-fit"
                (click)="createProject()"
              >
                <i class="ly-icon i-locally-add"></i>Create New Project
              </button>

              <div class="flex w-full flex-col">
                @for (project of projects.value; track project.id) {
                  <div
                    class="flex w-full cursor-pointer flex-row items-start gap-[16px] border-t border-locally-border px-[16px] py-[16px] hover:bg-locally-hover-background"
                  >
                    <app-avatar
                      [name]="project.name"
                      [size]="50"
                      shape="square"
                    ></app-avatar>

                    <div class="flex flex-col gap-[4px]">
                      <div class="text-xl font-medium">
                        <a class="ly-link" href="#">{{ project.name }}</a>
                      </div>
                      <div class="text-locally-caption-text">
                        {{ project.description }}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `
  ]
})
export class ProjectsComponent {
  projects$ = of([
    {
      id: 1,
      name: 'Locally CLI',
      description:
        'Locally CLI is a command-line interface for managing your locally hosted applications.'
    },
    {
      id: 2,
      name: 'Locally App',
      description: 'Frontend for Locally CLI.'
    },
    {
      id: 3,
      name: 'LAMP test project',
      description: 'A test project for LAMP stack applications.'
    }
  ]);

  createProject() {
    // Logic to create a new project
  }
}
