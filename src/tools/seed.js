export const types = {
  Q: 'q',
  S: 's'
};

let prev = null;
export const debounce = (...a) => {
  const curr = a.join('-');
  const match = curr !== prev;
  prev = curr;
  return match;
};

const seed = {
  screens: [
    {
      id: 1,
      criteria: [],
      questions: [
        { id: 11, criteria: [] },
        { id: 12, criteria: [] },
        { id: 13, criteria: [] },
        { id: 14, criteria: [12] },
        { id: 15, criteria: [] }
      ]
    },
    {
      id: 2,
      criteria: [],
      questions: [
        { id: 21, criteria: [11] },
        { id: 22, criteria: [13, 21] },
        { id: 23, criteria: [] },
        { id: 24, criteria: [] },
        { id: 25, criteria: [] }
      ]
    },
    {
      id: 3,
      criteria: [11, 13],
      questions: [
        { id: 31, criteria: [] },
        { id: 32, criteria: [11, 14] },
        { id: 33, criteria: [] },
        { id: 34, criteria: [] },
        { id: 35, criteria: [] }
      ]
    }
  ],
  error:''
};

export default seed;