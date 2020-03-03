import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucfirst'
})
export class UcfirstPipe implements PipeTransform {

  transform(value: string): string {
    var newString = ""
    for (var i = 0; i < value.length; i++) {
      var letter = value[i];
      if (i == 0) {
        letter = letter.toUpperCase()
      }
      newString += letter;
    }

    return newString;
  }

}
