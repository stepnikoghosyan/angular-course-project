export function convertJsonToFormData(obj: any): FormData {
  if (!obj) {
    return new FormData();
  }

  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });

  return formData;
}
