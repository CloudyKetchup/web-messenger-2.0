import { RoomContextHelpers as RoomContext } from "./RoomContextHelpers";

import AppContext from "../context/AppContext";

import { Message }  from "../model/Message";
import App from "../App";

//TODO: update documentation
export class AppContextHelpers
{
  static context : AppContext | null = null;    // context with app data for easier access from far away components
  private static component : App;

  /**
   * @param context     {@link AppContext} object
   * @param components  components for rerendering on context update
   */
  static createContext = (context : AppContext, component : App) => {
    AppContextHelpers.context = context;
    AppContextHelpers.component = component;
  }

  static refreshMainComponent = () => AppContextHelpers.component.forceUpdate();

  /**
   * Send message to server side and after that depending on response,
   * update related room
   * 
   * @param message   {@link Message} objectk
   */
  static sendMessage = async (message : Message) => {
    //TODO: fix that shit, more exactly do like in updateFriendsList method, you know what this means:))
    if (RoomContext.context?.data)
    {
      RoomContext.addMessage(message);
    }
    // TODO: fix
    // AppContextHelpers.components.forEach(c => c.forceUpdate());
  };
}