import { Directive, HostListener, ContentChild, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpStatusService } from '../../http/http-status.service';

@Directive({
  selector: '[appSubmitButton]'
})
export class SubmitButtonDirective implements OnInit, OnDestroy {
  httpStatusSubscription: Subscription;
  buttonClicked = false;
  @ContentChild('submitButton', {read: ElementRef}) private submitButton: ElementRef;

  constructor(
    private httpStatusService: HttpStatusService
  ) { }

  ngOnInit() {
    this.httpStatusSubscription = this.httpStatusService.getHttpStatusSubject().subscribe((status) => {
      if (this.buttonClicked) {
        this.submitButton.nativeElement.disabled = status;
        this.buttonClicked = status;
      }
    });
  }

  @HostListener('submit')
  submit(): void {
    this.buttonClicked = true;
  }

  ngOnDestroy() {
    this.httpStatusSubscription.unsubscribe();
  }
}
