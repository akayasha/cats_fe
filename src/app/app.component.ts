import { Component } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedComponent],
  template: `<app-feed></app-feed>`,
})
export class AppComponent {
  title = 'cat-projects';
}
