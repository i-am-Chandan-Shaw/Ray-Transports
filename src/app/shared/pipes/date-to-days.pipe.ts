import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToDays'
})
export class DateToDaysPipe implements PipeTransform {

  public date:string=''
  transform(value: string, ...args: unknown[]): unknown {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
    console.log(value);

    let date = new Date(value.replace('/','-'))
    let result = date.getDay()+' '+ month[date.getMonth()]+' '+date.getFullYear();
     

    return result
  }

}
