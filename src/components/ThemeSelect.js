import React from 'react';

const ThemeSelect = React.memo((props) => {
    return (
        <button
            className={'theme-select-btn' + (props.id === props.theme ? ' is-active' : '')}
            id={props.id}
            disabled={props.disabled}
            onClick={props.clickHandler()}>
            <img src={props.logo} alt={props.themeName} draggable="false" />
        </button>
    );
});

export default ThemeSelect;
