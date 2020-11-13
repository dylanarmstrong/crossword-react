import _ from 'lodash';
import md5 from 'md5';

const initialState = {
  acrossClues: [],
  author: '',
  clueIndex: 1,
  copyright: '',
  downClues: [],
  grid: null,
  height: 1,
  key: null,
  mode: 'across',
  puz: {},
  save: {},
  selected: {
    x: -1,
    y: -1,
  },
  setSave: () => undefined,
  title: '',
  width: 1,
};

const FILL = 'FILL';
const SET_PUZ = 'SET_PUZ';
const SET_SELECTED = 'SET_SELECTED';

const reducer = (state, action) => {
  const { data, type } = action;
  switch (type) {
    case FILL: {
      const { x, y, value } = data;
      const grid = [...state.grid];
      grid[y][x].value = value;
      const { key, save } = state;
      state.setSave({
        ...save,
        [key]: grid,
      });

      return {
        ...state,
        grid,
      };
    }

    case SET_PUZ: {
      const { puz } = data;
      if (!_.get(puz, 'valid', false)) {
        return state;
      }

      const { save } = state;
      const key = md5(_.get(puz, 'solution', []));

      const author = _.get(puz, 'author', null);
      const copyright = _.get(puz, 'copyright', null);
      const grid = _.get(save, key, _.get(puz, 'grid', []));
      const height = _.get(puz, 'header.height[0]', 1);
      const title = _.get(puz, 'title', '');
      const width = _.get(puz, 'header.width[0]', 1);

      const acrossClues = [];
      const downClues = [];
      grid.forEach(
        (row) => row.forEach(
          ({
            across: { clue: acrossClue },
            clueIndex,
            down: { clue: downClue },
          }) => {
            if (clueIndex) {
              if (acrossClue) {
                acrossClues.push({ clue: acrossClue, index: clueIndex });
              }
              if (downClue) {
                downClues.push({ clue: downClue, index: clueIndex });
              }
            }
          },
        ),
      );

      return {
        ...state,
        acrossClues,
        author,
        copyright,
        downClues,
        grid,
        height,
        key,
        puz,
        title,
        width,
      };
    }

    case SET_SELECTED: {
      const { selected } = data;
      const mode = _.get(data, 'mode', state.mode);
      const grid = [...state.grid];
      const { cell } = grid[selected.y][selected.x];

      const highlight = (cells) => {
        if (cells && cells.length > 0) {
          const eachCell = (cellIndex) => {
            const eachCol = (col) => {
              if (cell === col.cell) {
                col.selected = true;
              } else if (cellIndex === col.cell) {
                col.highlighted = true;
              }
            };
            const eachRow = (row) => {
              row.forEach(eachCol);
            };
            grid.forEach(eachRow);
          };
          cells.forEach(eachCell);
        }
      };

      const reset = () => {
        const eachCol = (col) => {
          col.highlighted = false;
          col.selected = false;
        };
        const eachRow = (row) => {
          row.forEach(eachCol);
        };
        grid.forEach(eachRow);
      };

      reset();

      let clueIndex = null;
      for (
        let highlighted = false, y = 0, yLen = grid.length;
        y < yLen && !highlighted;
        y++
      ) {
        const row = grid[y];
        for (
          let x = 0, xLen = row.length;
          x < xLen && !highlighted;
          x++
        ) {
          const col = row[x];
          const { across, down } = col;
          if (col.cell === cell) {
            highlight(mode === 'across' ? across.cells : down.cells);
            ({ clueIndex } = col);
            highlighted = true;
          } else if (mode === 'across' && across.cells && across.cells.includes(cell)) {
            ({ clueIndex } = col);
            highlight(across.cells);
            highlighted = true;
          } else if (mode === 'down' && down.cells && down.cells.includes(cell)) {
            ({ clueIndex } = col);
            highlight(down.cells);
            highlighted = true;
          }
        }
      }

      return {
        ...state,
        clueIndex,
        grid,
        mode,
        selected: {
          x: selected.x,
          y: selected.y,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export {
  FILL,
  SET_PUZ,
  SET_SELECTED,
  initialState,
  reducer,
};
