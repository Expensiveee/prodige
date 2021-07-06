import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getPath = (): Promise<string> => {
  return new Promise(resolve => {
    if (module && require.main) {
      if (require.main?.path) {
        resolve(require.main?.path);
      }
    } else {
      rl.question(
        'Please paste your root directory here (where your index.js is):',
        path => resolve(path),
      );
    }
  });
};
