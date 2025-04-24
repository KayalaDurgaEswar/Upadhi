import fs from 'fs';
import path from 'path';

/**
 * Initialize necessary folders for the application
 */
const initFolders = () => {
  const requiredDirs = [
    './tmp',
    './uploads'
  ];

  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  console.log('Folder initialization completed');
};

export default initFolders; 