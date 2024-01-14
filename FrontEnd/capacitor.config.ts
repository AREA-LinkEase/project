import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.linkease.app',
  appName: 'LinkEase',
  webDir: 'out',
  server: {
    androidScheme: 'http',
    "url": "http://135.181.165.228:8081"
  }
};

export default config;
