import { createSlice } from '@reduxjs/toolkit';

let items = createSlice({
  name: 'items',
  initialState: { data: [], sorted: [] },

  reducers: {
    setItems(state, a) {
      // data state is used to store originally fetched data
      // sorted state is used to store modified data
      state.data = a.payload;
      state.sorted = a.payload;
    },

    sortByBrand(state, a) {
      let items = a.payload[0];
      let brand = a.payload[1];
      let newArr = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].brand === brand) {
          newArr.push(items[i]);
        }
      }
      console.log(newArr);
      state.sorted = newArr;
    },

    sortByGender(state, a) {
      let items = a.payload[0];
      let gender = a.payload[1];
      let newArr = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].gender === gender) {
          newArr.push(items[i]);
        }
      }
      console.log(newArr);
      state.sorted = newArr;
    },

    sortByLimited(state, a) {
      let items = a.payload;
      let newArr = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].limited === true) {
          newArr.push(items[i]);
        }
      }
      console.log(newArr);
      state.sorted = newArr;
    },

    doubleCondition(state, a) {
      let items = a.payload[0];
      let gender = a.payload[1];
      let category = a.payload[2];
      let newArr = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].gender === gender && items[i].category === category) {
          newArr.push(items[i]);
        }
      }
      console.log(newArr);
      state.sorted = newArr;
    },

    multipleCondition(state, a) {
      let items = a.payload[0];
      let gender = a.payload[1];
      let category = a.payload[2];
      let newArr = [];

      for (let i = 0; i < items.length; i++) {
        if (
          (items[i].gender === gender && items[i].category === category[0]) ||
          items[i].category === category[1] ||
          items[i].category === category[2]
        ) {
          newArr.push(items[i]);
        }
      }
      console.log(newArr);
      state.sorted = newArr;
    },
  },
});

export default items;
export let {
  setItems,
  sortByBrand,
  sortByGender,
  sortByLimited,
  doubleCondition,
  multipleCondition,
} = items.actions;
