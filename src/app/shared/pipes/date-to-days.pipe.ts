import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToDays'
})
export class DateToDaysPipe implements PipeTransform {

  public date:string=''
  transform(value: string, ...args: unknown[]): unknown {
    let currentDate = Date()

    return null
  }

}
