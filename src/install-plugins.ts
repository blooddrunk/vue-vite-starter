import { App } from 'vue';

import * as directives from './directives';

export const install = async (app: App) => {
  let directiveName: keyof typeof directives;
  for (directiveName in directives) {
    const directive = directives[directiveName];

    app.directive(directiveName, directive);
  }
};
