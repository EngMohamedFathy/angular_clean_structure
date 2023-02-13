import { Component, Input } from '@angular/core';
import {UntypedFormControl, AbstractControl, FormControl} from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent {
  @Input() control: AbstractControl;
  @Input() labelName?: string;

  get errorMessage(): any {
    if(this.control.invalid){
      for (const propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          (this.control.touched || this.control.dirty)
        ) {
          return ValidationService.getValidationErrorMessage(
            propertyName,
            this.control.errors[propertyName],
            this.labelName
          );
        }
      }
    }
    return undefined;
  }
}
