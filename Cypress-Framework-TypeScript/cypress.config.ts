import { defineConfig } from 'cypress'
import path from 'path';
import { existsSync, readdirSync, lstatSync } from 'fs';
const downloadsDirPath = './cypress/fixtures/downloads';
import xlsx from 'xlsx';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

export default defineConfig({
  video: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        getLastDownloadFilePath() {
          if (!existsSync(downloadsDirPath)) {
            return null;
          }
          const filesOrdered = readdirSync(downloadsDirPath)
            .map((entry: string) => path.join(downloadsDirPath, entry))
            .filter((entryWithPath: any) => lstatSync(entryWithPath).isFile())
            .map((fileName: any) => ({ fileName, mtime: lstatSync(fileName).mtime }))
            .sort((a: { mtime: { getTime: () => number; }; }, b: { mtime: { getTime: () => number; }; }) => b.mtime.getTime() - a.mtime.getTime());

          if (!filesOrdered.length) {
            return null;
          }
          // TODO: this works only for chrome family browsers
          if (filesOrdered[0].fileName.indexOf('crdownload') > -1) {
            return null;
          }
          return filesOrdered[0].fileName;
        },
        generateJSONFromExcel(args) {
          const wb = xlsx.readFile(args.excelFilePath);
          const ws = wb.Sheets[args.sheetName];
          return xlsx.utils.sheet_to_json(ws, { raw: false });
        }
      })

      addMatchImageSnapshotPlugin(on, config);
      allureWriter(on, config);
      return config;

    },
    downloadsFolder: 'cypress/fixtures/downloads',
    env: {
      allureResultsPath: "allure-results",
      updateSnapshots: false,
      coverage: false,
      trashAssetsBeforeRuns: true,
      allure: true,

    },
    screenshotsFolder: "mochawesome-report/screenshot",
    video: false,
    viewportHeight: 1280,
    viewportWidth: 720,
    requestTimeout: 20000,
    watchForFileChanges: true,
    chromeWebSecurity: false,
    retries: 1,
  },
});
