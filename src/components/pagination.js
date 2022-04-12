import _ from 'lodash';

export const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages === 1) return null;

    const pages = _.range(1, totalPages + 1);

    return (
        <nav>
            <ul className='pagination'>
                {pages.map((page) => (
                    <li
                        onClick={() => onPageChange(page)}
                        className={`page-item  ${page === currentPage && 'active'}`}
                        key={page}>
                        <span className='page-link'>{page}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
