import { Router } from '@angular/router';
import { ErrorDialogComponent } from './../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Boat } from './../../entity/boat';
import { BoatService } from './../../service/boat.service';
import { Component, OnInit } from '@angular/core';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styles: [
  ]
})
export class BoatListComponent implements OnInit {

  boats: Boat[];

  constructor(private boatService: BoatService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchListBoats();
  }

  fetchListBoats() {
    this.boatService.getBoatList().subscribe(
      data => {
        this.boats = data;
      }, error => {
        this.errorDialog('Error Message', 'An error occurred while loading boats !');
      }
    );
  }

  onDelete(boatId: number) {

    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: '400px',
    data: {
      title: 'Are you sure?',
      message: 'You are about to delete this boat '}
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.boatService.delete(boatId).subscribe(response => {
          this.fetchListBoats();
        }, error => {
          this.errorDialog('Error Message', 'An error occurred while updating the boat !');
        });
      }
    });
  }

  private errorDialog(title: string, message: string) {
    const dialogRefErr = this.dialog.open(ErrorDialogComponent, {
      maxWidth: '400px',
      data: {
        title,
        message}
      });

    // listen to response
    dialogRefErr.afterClosed().subscribe(dialogResultErr => {
      if (dialogResultErr) {
        this.router.navigate(['login']);
      }
    });
  }

}
