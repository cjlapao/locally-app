import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex flex-col p-7 max-w-[1000px] gap-4 grow mx-auto overflow-auto"
    >
      <div class="text-2xl font-medium">Lanes</div>
      <div class="flex flex-row gap-2">
        <button class="ly-button"><i class="ly-icon-create"></i>New</button>
        <button class="ly-button ly-button--text">
          <i class="ly-icon-play"></i>Run all
        </button>
      </div>
      <div>
        <table class="ly-table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Steps</th>
              <th>Status</th>
              <th class="w-28"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a class="ly-link"
                  ><i class="ly-icon-document mr-1.5 relative top-[.15em]"></i
                  >My Component 1</a
                >
              </td>
              <td>Steps...</td>
              <td>Completed</td>
              <td>
                <button class="ly-button ly-button--text" title="Run">
                  <i class="ly-icon-play"></i>
                </button>
                <button class="ly-button ly-button--text">
                  <i class="ly-icon-more"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <a class="ly-link"
                  ><i class="ly-icon-document mr-1.5 relative top-[.15em]"></i
                  >PHP My Admin</a
                >
              </td>
              <td>Steps...</td>
              <td>Failed</td>
              <td>
                <button class="ly-button ly-button--text" title="Run">
                  <i class="ly-icon-play"></i>
                </button>
                <button class="ly-button ly-button--text">
                  <i class="ly-icon-more"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <a class="ly-link"
                  ><i class="ly-icon-document mr-1.5 relative top-[.15em]"></i
                  >Test lane</a
                >
              </td>
              <td>Steps...</td>
              <td>Running</td>
              <td>
                <button class="ly-button ly-button--text" title="Stop">
                  <i class="ly-icon-stop"></i>
                </button>
                <button class="ly-button ly-button--text">
                  <i class="ly-icon-more"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <a class="ly-link"
                  ><i class="ly-icon-document mr-1.5 relative top-[.15em]"></i
                  >LAMP Stack</a
                >
              </td>
              <td>Steps...</td>
              <td>Warnings</td>
              <td>
                <button class="ly-button ly-button--text" title="Run">
                  <i class="ly-icon-play"></i>
                </button>
                <button class="ly-button ly-button--text">
                  <i class="ly-icon-more"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class LanesComponent {}
