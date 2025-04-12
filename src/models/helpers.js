export function getValue(value, defaultValue, parse = data => data) {
  return (value && parse(value)) || defaultValue || '';
}

export function fillShipment(data) {
  if (data.shipment) {
    if (Object.keys(data.shipment).length) return data.shipment;
  }

  if (data.manualShipment) {
    if (Object.keys(data.manualShipment).length) return data.manualShipment;
  }

  return {};
}

export function getPrice(data) {
  if (data.price) {
    return Number.parseFloat(data.price);
  }

  if (data.prev_price) {
    return Number.parseFloat(data.prev_price);
  }

  if (data.prevPrice) {
    return Number.parseFloat(data.prevPrice);
  }

  return 0;
}

/**
 * Injector for DataService Composition DI
 * @param {Object} entity - class/object which fields should be injected
 * @param {Object:?DataService} target - target class which should be injected into composition
 * @param {Array} protectedFields - array of fields which shouldn't be used by target class
 */
export function inject(entity, target, protectedFields = []) {
  Object.keys(entity).forEach(key => {
    if (typeof entity[key] === 'function' || protectedFields.includes(key))
      return;
    target.itemField();
  });
  return target;
}
