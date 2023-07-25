import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements AfterViewInit {

  @ViewChild(CdkPortal) public readonly portal: CdkPortal | undefined;

  @Output() public readonly closeDialog = new EventEmitter<void>();
  
  private readonly overlayConfig = new OverlayConfig({
    hasBackdrop: true,
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    minWidth: 500
  });

  private overlayRef = this.overlay.create(this.overlayConfig);

  constructor(private readonly activatedRoute:ActivatedRoute, private readonly router: Router, private readonly overlay:Overlay){
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDialog.emit();
    })
  };

  public ngAfterViewInit(): void {
    this.overlayRef?.attach(this.portal);
  }

  public ngOnDestroy(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }
}
