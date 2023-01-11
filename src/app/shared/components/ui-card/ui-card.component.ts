import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [CommonModule, SharedModule, MaterialModule],
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css']
})
export class UiCardComponent {
  
  @Input() cardTitle!: string;
  @Input() cardBody!: string;
  @Input() cardLink!: string;


  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navigateFunction(){
    this.route.navigateByUrl(this.cardLink);
  }
}
