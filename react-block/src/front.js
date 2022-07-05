import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';
import domReady from '@wordpress/dom-ready';

const initReactComponents = () => {
    const items = document.querySelectorAll('.wp-block-create-block-react-block')
    if (items) {
		Array.from(items).forEach(item => {
			const attributes = JSON.parse(item.dataset.attributes)
            ReactDOM.hydrate( <MyComponent  {...attributes}/>, item )
        })
    }
}

domReady(initReactComponents)
