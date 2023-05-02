import { asyncWrapper, start, close } from '../../../../serverless-vercel-starter/src';

let runtime;
let inited;

exports.handler = asyncWrapper(async (...args) => {
  if (!inited) {
    inited = true;
    runtime = await start();
  }
  const res = await runtime.asyncEvent(async function (ctx) {
    const app = runtime.getApplication();
    const functionName = runtime.getFunctionName();
    const functionServiceName = runtime.getFunctionServiceName();
    if (ctx.query?.str) {
      return '123';
    }
    if (ctx.query?.buffer) {
      ctx.status = 401;
      return Buffer.from('123');
    }
    ctx.status = 401;
    return { path: ctx.path, functionName, functionServiceName, isExistsApp: !!app  };
  })(...args);
  await close();
  return res;
});
