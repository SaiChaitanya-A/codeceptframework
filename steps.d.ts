/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type flightPage = typeof import('./pages/flight.js');
type hrone = typeof import('./pages/hronepage.js');
type GeneralFunctions = import('./helpers/generalfunctions_helper.js');
type FlightBooking = import('./helpers/flightbooking_helpers.js');
type HROne = import('./helpers/HROne_helpers.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, flightPage: flightPage, hrone: hrone }
  interface Methods extends Playwright, GeneralFunctions, FlightBooking, HROne {}
  interface I extends ReturnType<steps_file>, WithTranslation<GeneralFunctions>, WithTranslation<FlightBooking>, WithTranslation<HROne> {}
  namespace Translation {
    interface Actions {}
  }
}
