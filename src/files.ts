/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
    'index.js': {
      file: {
        contents: `
  import express from 'express';
  const app = express();
  const port = 3111;
  
  app.get('/', (req, res) => {
    res.send('Welcome to a WebContainers app! 🥳\n Now you can edit this source code \n then automatically applied what has been changed');
  });
  
  app.listen(port, () => {
    console.log(\`App is live at http://localhost:\${port}\`);
  });`,
      },
    },
    'package.json': {
      file: {
        contents: `
  {
    "name": "example-app",
    "type": "module",
    "dependencies": {
      "express": "latest",
      "nodemon": "latest"
    },
    "scripts": {
      "start": "nodemon --watch './' index.js"
    }
  }`,
      },
    },
  };
  