import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log("------",value)
    return null;
  }

}
