import DataUtils from './DataUtils';

test('Should transform db data to array', () => {
    const data = {
        '1': {a: 1},
        '2': {a: 2},
        '3': {a: 3}
    };

    expect(DataUtils.dbDataToArray(data)).toMatchSnapshot();
});

test('Should calculate total width', () => {
    const data = {
        '1': {width: 1},
        '2': {width: 2},
        '3': {width: 3}
    };

    expect(DataUtils.getTotalWidth(data)).toEqual(6);
});
