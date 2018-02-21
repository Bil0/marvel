// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiKey: 'f6ef908792f697973acc37c5f0f89c4d',
  apiHost: {
    name: 'gateway.marvel.com',
    port: 433
  }
};
