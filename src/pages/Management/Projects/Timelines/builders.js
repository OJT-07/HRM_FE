import { MONTHS_PER_QUARTER, MONTHS_PER_YEAR, MONTH_NAMES, QUARTERS_PER_YEAR } from './constants';

import { addMonthsToYear, addMonthsToYearAsDate, colourIsLight, hexToRgb, nextColor } from './utils';

export const buildQuarterCells = (start, end) => {
  const v = [];

  const numOfYear = end - start + 1;

  for (let i = 0; i < QUARTERS_PER_YEAR * numOfYear; i += 1) {
    const quarter = (i % 4) + 1;
    const startMonth = i * MONTHS_PER_QUARTER;
    const s = addMonthsToYear(start, startMonth);

    const e = addMonthsToYear(start, startMonth + MONTHS_PER_QUARTER);

    v.push({
      id: `${s.year}-q${quarter}`,
      title: `Q${quarter} ${s.year}`,
      start: new Date(`${s.year}-${s.month}-01`),
      end: new Date(`${e.year}-${e.month}-01`)
    });
  }
  return v;
};

export const buildMonthCells = (start_date, end_date) => {
  const numOfYear = end_date - start_date + 1;

  const v = [];
  for (let i = 0; i < MONTHS_PER_YEAR * numOfYear; i += 1) {
    const startMonth = i;

    const start = addMonthsToYearAsDate(start_date, startMonth);
    const end = addMonthsToYearAsDate(start_date, startMonth + 1);

    v.push({
      id: `m${startMonth}`,
      title: MONTH_NAMES[i % 12],
      start,
      end
    });
  }
  return v;
};

export const buildTimebar = (start, end) => [
  {
    id: 'quarters',
    title: 'Quarters',
    cells: buildQuarterCells(start, end),
    style: {}
  },
  {
    id: 'months',
    title: 'Months',
    cells: buildMonthCells(start, end),
    useAsGrid: true,
    style: {}
  }
];

export const buildElement = ({ data, start, end, i }) => {
  const bgColor = nextColor();
  const color = colourIsLight(...hexToRgb(bgColor)) ? '#000000' : '#ffffff';
  return {
    id: `${i}`,
    title: `${data.position}`,
    start,
    end,
    style: {
      backgroundColor: `#${bgColor}`,
      color,
      borderRadius: '4px',
      boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
      textTransform: 'capitalize'
    }
  };
};

export const buildTrack = (data, start_date, end_date, trackId) => {
  const v = [];
  let i = 1;

  const start = new Date(data.join_date);
  console.log('🚀 ~ file: builders.js:86 ~ buildTrack ~ start:', start);

  let end;
  if (data.end_date !== null) {
    end = new Date(data.end_date);
    console.log('🚀 ~ file: builders.js:91 ~ buildTrack ~ end:', end);
  } else {
    end = new Date(end_date);
    console.log('🚀 ~ file: builders.js:94 ~ buildTrack ~ end:', end);
  }

  v.push(
    buildElement({
      data,
      start,
      end,
      i
    })
  );

  i += 1;
  // const gap = buildElementGap();
  // month += monthSpan + gap;
  // i += 1;
  // }

  return {
    id: `${data.employee.id}`,
    title: `${data.employee.name}`,
    // elements: buildElements(trackId)
    elements: v
  };
};
