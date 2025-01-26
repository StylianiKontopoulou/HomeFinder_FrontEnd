import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import EnumHelpers from 'src/app/shared/helpers/enumHelpers';
import { Property } from 'src/app/shared/interfaces/property';
import { UserService } from 'src/app/shared/services/user.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeletePropertyConfirmDialogComponent } from '../delete-property-confirm-dialog/delete-property-confirm-dialog.component';
import { PropertyService } from 'src/app/shared/services/property.service';

@Component({
  selector: 'app-property-card',
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css',
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: Property;
  userService = inject(UserService);
  propertyService = inject(PropertyService);
  readonly dialog = inject(MatDialog);
  userOwned: boolean = false;

  ngOnInit(): void {
    let currentUser = this.userService.user();
    if (currentUser !== null) {
      this.userOwned = this.userService.user().id == this.property.user.id;
    }
  }

  getPricePerSquareMeter(): string {
    return this.property.squareMeters === 0
      ? '0'
      : (this.property.price / this.property.squareMeters).toFixed(2);
  }
  getPropertyTypeLabel(): string {
    return EnumHelpers.getLabelForPropertyType(this.property.propertyType);
  }

  getEnergyClassLabel(): string {
    return EnumHelpers.getLabelForEnergyClass(this.property.energyClass);
  }

  getPropertyConditionLabel(): string {
    return EnumHelpers.getLabelForPropertyCondition(this.property.condition);
  }

  getPropertyUseLabel(): string {
    return EnumHelpers.getLabelForPropertyUse(this.property.propertyUse);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(DeletePropertyConfirmDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.propertyService.deleteProperty(this.property.id)
        .subscribe({
          next: (response) => {
            window.location.reload();
          },
          error: (response) => {
            console.log('Error deleting properties', response);
          },
        });
      }
    });
  }
}
