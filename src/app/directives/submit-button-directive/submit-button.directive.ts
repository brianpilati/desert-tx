import { Directive, HostListener, ContentChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { StorageService } from '../../storage/storage.service';
import { HttpStatusService } from '../../http/http-status.service';

@Directive({
  selector: '[appSubmitButton]'
})
export class SubmitButtonDirective implements OnInit, OnDestroy {
  httpStatusSubscription: Subscription;
  @ContentChild('submitButton') submitButton;

  constructor(
    private httpStatusService: HttpStatusService 
  ) { }

  ngOnInit() {
    this.httpStatusSubscription = this.httpStatusService.getHttpStatusSubject().subscribe((status) => {
      this.submitButton._elementRef.nativeElement.disabled = status;
    });

  }

  @HostListener('submit')
  submit(): void {
    this.submitButton._elementRef.nativeElement.disabled = true;
  }

  ngOnDestroy() {
    this.httpStatusSubscription.unsubscribe();
  }
}
