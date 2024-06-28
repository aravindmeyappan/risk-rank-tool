// src/utils/excelReader.js

import * as XLSX from 'xlsx';

export const readExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      resolve(jsonData);
    };

    reader.onerror = (event) => {
      reject(event);
    };

    reader.readAsBinaryString(file);
  });
};
