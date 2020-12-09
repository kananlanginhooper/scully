import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';

// Routes
const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'detail/:diseaseName',
    component: DetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
