import ComponentContext from "./ComponentContext";

import RoomContext from "../context/RoomContext";

import RoomComponent from "../components/RoomComponent/RoomComponent";

export class RoomComponentContext extends ComponentContext
{
  private static instance : RoomComponentContext;
  private static roomComponent : RoomComponent;

  static getInstance = () : RoomComponentContext =>
  {
    if (!RoomComponentContext.instance)
    {
      RoomComponentContext.instance = new RoomComponentContext();
    }
    return RoomComponentContext.instance;
  };

  updateRoom = (room: RoomContext) =>
  {
    if (!RoomComponentContext.roomComponent)
    {
      RoomComponentContext.roomComponent = this.components.filter(c => c instanceof RoomComponent)[0] as RoomComponent;
    }
    RoomComponentContext.roomComponent && RoomComponentContext.roomComponent.setState({ room : room });
  };
}
