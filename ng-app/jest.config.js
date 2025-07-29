config = { preset: 'jest-preset-angular' };

// Don't set setupFilesAfterEnv in case of running from ng cli (ng test)
if (!process.argv.some((item) => item.includes('@angular\\cli\\bin\\ng'))) {
  config.setupFilesAfterEnv = ['<rootDir>/setup-jest.ts'];
}

module.exports = config;
