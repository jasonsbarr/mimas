import { create } from "@jasonsbarr/functional-core/lib/object/create.js";
import { hasOwn } from "@jasonsbarr/functional-core/lib/object/hasOwn.js";

function Environment(parent = null) {
  this.vars = create(parent ? parent.vars : null);
  this.types = create(parent ? parent.types : null);
  this.parent = parent;
}

Environment.prototype = {
  extend() {
    return new Environment(this);
  },

  lookup(name) {
    let scope = this;
    while (scope) {
      if (hasOwn(name, scope.vars)) {
        return scope;
      }
      scope = scope.parent;
    }
  },

  lookupType(name) {
    let scope = this;
    while (scope) {
      if (hasOwn(name, scope.types)) {
        return scope;
      }
      scope = scope.parent;
    }
  },

  lookupInCurrent(name) {
    if (name in this.vars) {
      return this.vars[name];
    }
    throw new ReferenceError(`${name} not found in current scope`);
  },

  lookupTypeInCurrent(name) {
    if (name in this.types) {
      return this.types[name];
    }
    throw new ReferenceError(`${name} not found in current scope`);
  },

  get(name) {
    if (name in this.vars) {
      return this.vars[name];
    }
    throw new ReferenceError(`Unbound identifier ${name}`);
  },

  getType(name) {
    if (name in this.types) {
      return this.types[name];
    }
    throw new ReferenceError(`Type ${name} not found`);
  },

  set(name, value) {
    let scope = this.lookup(name);
    if (!scope) {
      throw new ReferenceError(
        `Cannot set value for unbound identifier ${name}`
      );
    }
    scope.vars[name] = value;
  },

  def(name, value) {
    this.vars[name] = value;
  },

  defType(name, value) {
    this.types[name] = value;
  },
};

export const env = () => new Environment();
