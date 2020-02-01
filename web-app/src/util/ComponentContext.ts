import { Component } from "react";

export default class ComponentContext
{
  protected components : Component[] = [];

  registerComponent = (component: Component) =>
  {
    const alreadyExists = () =>
    {
      this.components.forEach(c =>
      {
        if (c == component) return true;
      });
      return false;
    };
    !alreadyExists() && this.components.push(component);
  };

  updateAll = () =>
  {
    this.components.forEach(component => component.forceUpdate());
  };
};