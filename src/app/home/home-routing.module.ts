import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children:[
      {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then( m => m.CustomersPageModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales/sales.module').then( m => m.SalesPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then( m => m.ReportsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/customers',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/customers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
