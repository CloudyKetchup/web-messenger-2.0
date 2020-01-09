import ProfileContext from "../context/ProfileContext";

import { Room } from "../model/Room";

export class ProfileContextHelpers {
  static profileContext : ProfileContext | null = null;

  /**
   * Creates profile context and accepts components for rerender on context update
   * 
   * @param context     {@link ProfileContext} context
   * @param components  {@link Component}'s for rerender
   */
  static createContext = (context : ProfileContext) => ProfileContextHelpers.profileContext = context;

  /**
   * Add a room to rooms list from profile
   * 
   * @param room    {@link Room}
   * @return {@link Room} or void depending on success
   */
  static addRoom = (room : Room) : Room | void => {
    if (!ProfileContextHelpers.roomExist(room))
    {
      ProfileContextHelpers.profileContext?.rooms.push(room);

      return ProfileContextHelpers.findRoomById(room.id);
    }
  };

  /**
   * Find room in rooms list from profile context by it's id
   * 
   * @param id    {@link Room} id
   * @return {@link Room} or void if not found
   */
  static findRoomById = (id : string) : Room | void => {
    return ProfileContextHelpers.profileContext?.rooms.filter(r => r.id === id)[0];
  };

  /**
   * Checks if room exists in rooms list from profile context
   * 
   * @param room    {@link Room}
   * @return boolean depending on result
   */
  static roomExist = (room : Room) : Boolean => {
    return ProfileContextHelpers.profileContext?.rooms.filter(r => r === room)[0] !== undefined;
  }
}