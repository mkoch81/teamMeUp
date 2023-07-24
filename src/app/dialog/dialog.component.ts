import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  @Output() public readonly storeData = new EventEmitter<string>();

  constructor(private readonly activatedRoute:ActivatedRoute, private readonly router: Router){};

  public closeDialog(): void {
    console.log('CLOSE DIALOG DIALOG');
    this.storeData.emit();
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
