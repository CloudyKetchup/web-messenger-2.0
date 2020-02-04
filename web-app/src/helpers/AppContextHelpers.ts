import AppContext from "../context/AppContext";

import App from "../App";

export class AppContextHelpers
{
  static context : AppContext | null = null;
  private static component : App;

  /**
   * @param context     {@link AppContext} object
   * @param component   App component
   */
  static createContext = (context : AppContext, component : App) => {
    AppContextHelpers.context = context;
    AppContextHelpers.component = component;
  }

  /**
   * Update App component
   */
  static refreshMainComponent = () => AppContextHelpers.component.forceUpdate();
}