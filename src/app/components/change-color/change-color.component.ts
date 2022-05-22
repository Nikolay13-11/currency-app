import { Component } from '@angular/core';
import {ThemeService} from "../../services/internal/theme.service";

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent {
  stateOptions: any[];
  value: string = "off";

  constructor(private themeService: ThemeService) {
    this.stateOptions = [{label: 'Jasny', value: 'off'}, {label: 'Ciemny', value: 'on'}];
  }

  change(event: any) {
    if (event.value === 'on') {
      this.themeService.switchTheme('lara-dark-blue')
    }
    else {
      this.themeService.switchTheme('lara-light-blue')
    }
  }
}
