const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/index.html', fileContent, (err) => {
      if (err) reject(err);
      resolve({
        ok: true,
        message: 'File created.',
      });
    });
  });
};

const copyFile = () => {
  return new Promise((resolve, reject) => {
    fs.copyFile('./src/style.css', './dist/style.css', (err) => {
      if (err) reject(err);
      resolve({
        ok: true,
        message: 'File copied.',
      });
    });
  });
};

module.exports = {
  writeFile,
  copyFile,
};
