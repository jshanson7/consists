/**
 * Tests if arrays consist of the same members; handles
 *  - arrays with multiple equivalent values
 *  - non-primitive array value types
 *
 * @param {...Array} [arrays] The arrays to compare.
 * @returns {boolean} Returns `true` if all unordered arrays are equivalent.
 */

export default function consists(...arrays) {
  if (arrays.length <= 1) {
    return true;
  }

  if (!arrays.every(array => array.constructor === Array)) {
    return false;
  }

  let [firstArray, ...others] = arrays;
  let {length} = firstArray;
  let lengthsEqual = others.every(other => length === other.length);

  if (!lengthsEqual) {
    return false;
  }

  let value;
  const compareNextOther = (other, index) => (
    length === (others[index] = without(other, value)).length
  );

  while (length > 0) {
    value = firstArray[0];
    firstArray = without(firstArray, value);
    length = firstArray.length;
    lengthsEqual = others.every(compareNextOther);

    if (!lengthsEqual) {
      return false;
    }
  }

  return true;
}

function without(array, ...valuesToRemove) {
  const result = array.slice();
  let numberOfValuesToRemove = valuesToRemove.length;
  let valueToRemove;
  let indexOfValueToRemove;

  while (numberOfValuesToRemove && result.length) {
    valueToRemove = valuesToRemove[--numberOfValuesToRemove];
    while ((indexOfValueToRemove = indexOf(result, valueToRemove)) !== -1) {
      result.splice(indexOfValueToRemove, 1);
    }
  }
  return result;
}

// simplified lodash indexOf, uses SameValueZero
function indexOf(array, value) {
  const length = array.length;

  if (!length) {
    return -1;
  }

  if (value !== value) {
    return indexOfNaN(array);
  }

  let index = -1;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

function indexOfNaN(array) {
  const length = array.length;
  let index = -1;
  let currentValue;

  while (++index < length) {
    currentValue = array[index];
    if (currentValue !== currentValue) {
      return index;
    }
  }
  return -1;
}
