
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RepoCardModule } from 'src/app/shared/components/repo-card/repo-card.module';
import { CardLoaderModule } from 'src/app/shared/components/card-loader/card-loader.module';
import { UserDetailsModule } from 'src/app/shared/components/user-details/user-details.module';
import { UserDetailsLoaderModule } from 'src/app/shared/components/user-details-loader/user-details-loader.module';
import { NoDataModule } from 'src/app/shared/components/no-data/no-data.module';




@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    NgbModule,
    RepoCardModule,
    CardLoaderModule,
    UserDetailsModule,
    UserDetailsLoaderModule,
    NoDataModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserProfileComponent
      }
    ])
  ],

})
export class UserProfileModule { }
