import { create } from "@jasonsbarr/functional-core/lib/object/create.js";

export const env = (parent = null) => {
  const envObj = {
    vars: create(parent ? parent.vars : null),
    types: create(parent ? parent.types : null),
  };

  envObj.extend = () => env(envObj);

  return envObj;
};
