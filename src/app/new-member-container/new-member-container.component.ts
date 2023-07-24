import { AfterViewInit, Component, EventEmitter, Inject, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { Overlay ,OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-new-member-container',
  templateUrl: './new-member-container.component.html',
  styleUrls: ['./new-member-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewMemberContainerComponent implements AfterViewInit {

  @ViewChild(CdkPortal) public readonly portal: CdkPortal | undefined;

  @Output() public readonly closeDialog = new EventEmitter<void>();

  private readonly overlayConfig = new OverlayConfig({
    hasBackdrop: true,
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    minWidth: 500
  });

  private overlayRef = this.overlay.create(this.overlayConfig);

  constructor(private readonly overlay: Overlay){
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDialog.emit();
    })
  }

  public ngAfterViewInit(): void {
    this.overlayRef?.attach(this.portal);
  }

  public ngOnDestroy(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }

  // close(name:string) {
  //   this.dialogRef.close();
  //   const newMember:Member = new Member(1,name,true,'',0);
  //   this.teamsService.createNewMember(newMember);
  //   this.teamsService.createTeams();    

  // }
}
