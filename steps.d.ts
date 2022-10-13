/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type GeneralFunctions = import('./helpers/generalfunctions_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Playwright, GeneralFunctions {}
  interface I extends ReturnType<steps_file>, WithTranslation<GeneralFunctions> {}
  namespace Translation {
    interface Actions {}
  }
}
