import ProfileContext from "../context/ProfileContext";

export class ProfileContextHelpers {
  static profileContext : ProfileContext | null = null;

  /**
   * Creates profile context and accepts components for rerender on context update
   * 
   * @param context   {@link ProfileContext} context
   * @param components  {@link Component}'s for rerender
   */
  static createContext = (context : ProfileContext) => ProfileContextHelpers.profileContext = context;
}