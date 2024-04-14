import { IApi } from 'umi';

export default (api: IApi) => {
  api.onBeforeMiddleware(({ app }) => {
    // https://github.com/umijs/umi/issues/12144
    app._router.stack = app._router.stack.filter((layer: any) => {
      return layer.name !== 'compression';
    });
  });
};
