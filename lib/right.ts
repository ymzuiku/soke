import { Types } from "./types";

export const rights = {
  type: (values: any, key: string, type?: Types, typeChange?: boolean) => {
    if (type === undefined) {
      return true;
    }
    const value = values[key];
    if (type === "array" && Array.isArray(value)) {
      return true;
    }

    const t = typeof value;
    if (typeChange && t !== type) {
      if (type === "number") {
        const nextVal = Number(value);
        if (isNaN(nextVal)) {
          return false;
        }
        values[key] = nextVal;
        return true;
      } else if (type === "string") {
        if (type === undefined || type === null) {
          return false;
        }
        values[key] = value + "";
        return true;
      } else if (type === "boolean") {
        values[key] = !!value;
        return true;
      }
    }

    return t === type;
  },
  min: (value: any, min?: number) => {
    if (min === undefined) {
      return true;
    }
    if (typeof value === "number") {
      return value >= min;
    }
    if (value && value.length) {
      return value.length >= min;
    }
    return false;
  },
  max: (value: any, max?: number) => {
    if (max === undefined) {
      return true;
    }
    if (typeof value === "number") {
      return value <= max;
    }
    if (value && value.length) {
      return value.length <= max;
    }
    return false;
  },
  pick: (value: any, pick?: Set<string>) => {
    if (pick === undefined) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (Array.isArray(value)) {
      let out = true;
      for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (!pick.has(v)) {
          out = false;
          break;
        }
      }
      return out;
    }
    if (!pick.has(value)) {
      return false;
    }
    return true;
  },
  notPick: (value: any, notPick?: Set<string>) => {
    if (notPick === undefined) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (Array.isArray(value)) {
      let out = true;
      for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (notPick.has(v)) {
          out = false;
          break;
        }
      }
      return out;
    }
    if (notPick.has(value)) {
      return false;
    }
    return true;
  },
};
