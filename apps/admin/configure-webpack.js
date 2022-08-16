const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
/*
 * Modify the webpack config by exporting an Object or Function.
 *
 * If the value is an Object, it will be merged into the final
 * config using `webpack-merge`.
 *
 * If the value is a function, it will receive the resolved config
 * as the argument. The function can either mutate the config and
 * return nothing, OR return a cloned or merged version of the config.
 *
 * https://cli.vuejs.org/config/#configurewebpack
 */
module.exports = {
  // ...
  plugins: [
    AutoImport({
      dts: './apps/admin/typings/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: './apps/admin/typings/components.d.ts',
      dirs: './apps/admin/src/components',
      resolvers: [ElementPlusResolver()],
    }),
  ],
};
