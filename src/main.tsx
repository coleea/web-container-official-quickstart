import './index.css'
import { files } from './files';
import { WebContainer } from '@webcontainer/api';

let webcontainerInstance: WebContainer;

const iframeEl = document.querySelector('iframe')!;
const textareaEl = document.querySelector('textarea')!;

window.addEventListener('load', async () => {

  textareaEl!.value = files['index.js'].file.contents;

  webcontainerInstance = await WebContainer.boot();

  textareaEl && textareaEl.addEventListener('input', (e) => {
    writeIndexJS((e.currentTarget as any).value)
  })
  
  await webcontainerInstance.mount(files);
  
  const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');
  const exitCode = await installDependencies(webcontainerInstance)
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  }
  startDevServer(webcontainerInstance)
});

async function installDependencies(webcontainerInstance : any) {
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      const logElem = document.querySelector('.log textarea')
      if(logElem) {
        logElem.textContent += '\n' + data ;
        // logElem.scrollTo(0, logElem.scrollHeight)        
      }      
    }
  }));
  return installProcess.exit;
}

async function startDevServer(webcontainerInstance : any) {
  await webcontainerInstance.spawn('npm', ['run', 'start']);

  webcontainerInstance.on('server-ready', (port : number, url : string) => {
    iframeEl!.src = url;
  });
}

async function writeIndexJS(content : string) {
  await webcontainerInstance.fs.writeFile('/index.js', content);
}
