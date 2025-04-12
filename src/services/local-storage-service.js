export function setStorageData(key, mainData, updatedData = {}, deletedField) {
  if (deletedField) delete mainData[deletedField];

  return localStorage.setItem(
    key,
    JSON.stringify({
      ...mainData,
      ...updatedData,
    })
  );
}

export function getDataFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
