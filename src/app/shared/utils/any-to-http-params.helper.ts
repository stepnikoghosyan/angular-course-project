import { HttpParams } from '@angular/common/http';
import { IQueryParams } from '@shared/models/query-params.model';

export function anyToHttpParams(obj?: IQueryParams): HttpParams {
  let param = new HttpParams();

  if (!obj) {
    return param;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Array is sent to API like this: propertyName1=value1&propertyName1=value2&propertyName1=value3
      // If array is empty => remove it from query params
      // If array item is null or undefined => remove it from array
      if (obj[key] && Array.isArray(obj[key])) {

        const arrayNotNullValues = (obj[key] as Array<any>).filter(val => val !== null && val !== undefined);
        if (!arrayNotNullValues.length) {
          return param;
        }

        param = param.set(key, obj[key][0]);

        for (let i = 1; i < arrayNotNullValues.length; i++) {
          param = param.append(key, arrayNotNullValues[i]);
        }
      } else if (obj[key]) {
        param = param.set(key, obj[key] as string);
      }
    }
  }

  return param;
}
