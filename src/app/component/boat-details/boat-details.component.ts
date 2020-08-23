import { ErrorDialogComponent } from './../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BoatService } from './../../service/boat.service';
import { BoatType } from './../../entity/boat-type';
import { BoatTypeService } from './../../service/boat-type.service';
import { Component, OnInit } from '@angular/core';
import { Boat } from 'src/app/entity/boat';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.css']
})
export class BoatDetailsComponent implements OnInit {

  boatId = 0;
  boat: Boat = new Boat(0, '', '', null);
  boatTypes: BoatType[];

  constructor(
    private boatService: BoatService,
    private boatTypeService: BoatTypeService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleBoatDetails();
    });
    this.listBoatTypes();
  }

  handleBoatDetails() {

    this.boatId = +this.route.snapshot.paramMap.get('id');

    if (this.boatId !== 0) {
      this.boatService.getBoat(this.boatId).subscribe(
        data => {
          this.boat = data;
        }, error => {
          this.errorDialog('Error Message', 'An error occurred while retrieving the boat !');
        }
      );
    }
  }

  listBoatTypes() {
    this.boatTypeService.getBoatTypeList().subscribe(
      data => {
        this.boatTypes = data;
      }, error => {
        this.errorDialog('Error Message', 'An error occurred while retrieving the boat list !');
      }
    );
  }

  onSubmit(form: NgForm) {

    if (!form.valid){
      return;
    }
    const value = form.value;
    const theBoatType = this.boatTypes.find(x => +x.id === +value.type);

    const theBoat = new Boat(this.boatId, value.name, value.description, theBoatType);

    if (this.boatId === 0) {
      this.boatService.save(theBoat).subscribe(
        boat => {
          this.router.navigate(['boats']);
        }, error => {
          this.errorDialog('Error Message', 'An error occurred while adding the boat !');
        }
      );
    } else {
      this.boatService.update(theBoat).subscribe(
        boat => {
          this.router.navigate(['boats']);
        }, error => {
          this.errorDialog('Error Message', 'An error occurred while updating the boat !');
        }
      );
    }

  }

  onCancel() {
    this.router.navigate(['boats']);
  }

  onDelete() {

    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Are you sure?',
        message: 'You are about to delete this boat '
      }
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.boatService.delete(this.boatId).subscribe(response => {
          this.router.navigate(['boats']);
        }, error => {
          this.errorDialog('Error Message', 'An error occurred while deleting the boat !');
        });
      }
    });
  }

  private errorDialog(title: string, message: string) {
    const dialogRefErr = this.dialog.open(ErrorDialogComponent, {
      maxWidth: '400px',
      data: {
        title,
        message
      }
    });

    // listen to response
    dialogRefErr.afterClosed().subscribe(dialogResultErr => {
      if (dialogResultErr) {
        this.router.navigate(['boats']);
      }
    });
  }
}
