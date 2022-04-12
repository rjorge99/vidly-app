export const Like = ({ liked, onClick }) => {
    let componentClass = 'fa fa-heart';
    if (!liked) componentClass += '-o';

    return (
        <i
            onClick={onClick}
            className={componentClass}
            aria-hidden='true'
            style={{ cursor: 'pointer' }}></i>
    );
};
