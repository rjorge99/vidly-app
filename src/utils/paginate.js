import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    return _(items)
        .slice((pageNumber - 1) * pageSize)
        .take(pageSize)
        .value();
}
