/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
    'index.js': {
      file: {
        contents: `
import * as Effect from "@effect/io/Effect";
import { pipe } from "@effect/data/Function";
import * as Either from "@effect/data/Either";
import * as Layer from "@effect/io/Layer";
import * as Context from "@effect/data/Context";

(function basicOperation() {
    const sync = Effect.sync(() => "Hello World");
    console.log(
        Effect.runSync(sync)
    );        
})();
  `,
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
      "nodemon": "latest",
      "@effect/io": "latest",
      "@effect/data": "latest"
    },
    "scripts": {
      "start": "nodemon --watch './' index.js"
    }
  }`,
      },
    },
  };
  