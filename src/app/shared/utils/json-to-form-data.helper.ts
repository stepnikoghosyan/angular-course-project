import { base64ToFile } from 'ngx-image-cropper';

export function convertJsonToFormData(obj: any, fileFields?: string[]): FormData {
  if (!obj) {
    return new FormData();
  }

  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    if (!!fileFields && fileFields.length && fileFields.includes(key)) {
      if (obj[key]) {
        formData.append(key, base64ToFile(obj[key]));
      }
    } else {
      formData.append(key, obj[key]);
    }
  });

  return formData;
}
