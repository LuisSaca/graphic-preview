import { createSlice } from "@reduxjs/toolkit";
export const elementsSlice = createSlice({
  name: "elements",
  initialState : {
    elements: [
      {
        id: 0,
        name: "caja1",
        masa: 0,
        miu: 0,
        g: 0,
      },
      {
        id: 1,
        name: "caja2",
        masa: 0,
        miu: 0,
      }
    ],
    results: [
      {
        normal: 0,
        fr: 0,
        aceleracion: 0,
        tension: 0,
      }
    ]
  },
  reducers: {
    updateElements: (state, action) => {
      const { id, masa } = action.payload;
      const existingElement = state.elements.findIndex((element) => element.id === id);

      if (existingElement !== -1) {
        state.elements[existingElement].masa = masa;
      }
    },
    updateMiu: (state, action) => {
      const { id, miu } = action.payload;
      const existingElement = state.elements.findIndex((element) => element.id === id);
      if (existingElement !== -1) {
        state.elements[existingElement].miu = miu;
      }
    },
    updateG: (state, action) => {
      const { id, g } = action.payload;
      const existingElement = state.elements.findIndex((element) => element.id === id);
      if (existingElement !== -1) {
        state.elements[existingElement].g = g;
      }
    },
    updateResults: (state, action) => {
      const { normal, fr, aceleracion, tension } = action.payload;
      state.results[0].normal = normal;
      state.results[0].fr = fr;
      state.results[0].aceleracion = aceleracion;
      state.results[0].tension = tension;
    },
  },
});

export const { updateElements, updateMiu,updateG, updateResults } = elementsSlice.actions;

export default elementsSlice.reducer;

// Path: src/store/Elements.slice.jsx
