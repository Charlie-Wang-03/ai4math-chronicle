import { defineConfig, devices } from '@playwright/test';

const origin = 'http://127.0.0.1:4321';
const projectBase = '/ai4math-chronicle';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 30_000,
  expect: { timeout: 7_500 },
  fullyParallel: false,
  workers: 1,
  reporter: process.env.CI ? [['line']] : [['list']],
  outputDir: 'test-results',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: origin,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321',
    url: `${origin}${projectBase}/en/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
