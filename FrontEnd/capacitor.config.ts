import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.linkease.app',
  appName: 'LinkEase',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
