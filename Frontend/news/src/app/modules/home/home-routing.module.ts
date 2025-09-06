import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { StoryViewerComponent } from './components/stories/story-viewer/story-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [{ path: 'story', component: StoryViewerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
