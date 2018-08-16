import { Component, Inject, NgZone, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'core-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SnackBarComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private zone: NgZone,
    private router: Router
  ) {
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigateByUrl('/auth');
    })
  }

  onClick(): void {
    this.zone.run(() => {
      this.snackBarRef.dismiss();
    });
  }
}
