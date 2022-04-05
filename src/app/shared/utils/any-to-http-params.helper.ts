import { HttpParams } from '@angular/common/http';
import { IQueryParams } from '@shared/models/query-params.model';

export function anyToHttpParams(obj?: IQueryParams): HttpParams {
  let param = new HttpParams();

  if (!obj) {
    return param;
  }

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    // Array is sent to API like this: propertyName1=value1&propertyName1=value2&propertyName1=value3
    // If array is empty => remove it from query params
    // If array item is null or undefined => remove it from array
    if (obj[key] && Array.isArray(obj[key])) {
      param = appendArrayToHttpParams(param, key, obj[key]);
    } else if (obj[key]) {
      param = param.set(key, obj[key] as string);
    }
  }

  return param;
}

function appendArrayToHttpParams(params: HttpParams, underKey: string, array?: any[]): HttpParams {
  if (!array || !array.length) {
    return params;
  }

  const arrayNotNullValues = array.filter(val => val !== null && val !== undefined);
  if (!arrayNotNullValues.length) {
    return params;
  }

  let newParams = params;

  arrayNotNullValues.forEach((value) => {
    newParams = newParams.append(underKey, value);
  });

  return newParams;
}
