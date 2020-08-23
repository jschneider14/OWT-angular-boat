import { Router } from '@angular/router';
import { ErrorDialogComponent } from './../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Boat } from './../../entity/boat';
import { BoatService } from './../../service/boat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'type', 'actionsColumn'];
  dataSource: MatTableDataSource<Boat>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  boats: Boat[];

  constructor(private boatService: BoatService, private router: Router, public dialog: MatDialog) {
    this.fetchListBoats();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchListBoats() {
    this.boatService.getBoatList().subscribe(
      data => {
        this.boats = data;
        this.dataSource = new MatTableDataSource(this.boats);

        this.dataSource.paginator = this.paginator;

        // Custom sort order to sort on the type.name element
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'type': return item.type.name;
            default: return item[property];
          }
        };

        this.dataSource.sort = this.sort;

        // custom filter to filter on the type.name element
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'type' ? currentTerm + data.type.name : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
