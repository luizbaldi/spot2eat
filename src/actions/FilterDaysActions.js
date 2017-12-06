/* Action Types */
export const SET_FILTER = 'SET_FILTER';

/* Action Creators */
export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  };
};

export function toggleDay(filterDays, day) {
  if (filterDays[day.id]) {
    delete filterDays[day.id];
  } else {
    filterDays[day.id] = day;
  }

  return {
    type: SET_FILTER,
    payload: filterDays
  }
}
