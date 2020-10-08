import React from 'react';
import ReactDom from 'react-dom';

import {HomePage} from 'pages/Home';
import {AboutPage} from 'pages/About';
import {ContactsPage} from 'pages/Contacts';
import {NotFoundPage} from 'pages/PageNotFound';

class AppRouting extends React.Component {
    state = {
        route: this.route, //Для удаления символа #
    };

    get route(){
        return window.location.hash.substr(1);
    }

    hashchangeHandler = () => {
        this.setState({route: this.route})
    };

    componentDidMount(){
        window.addEventListener('hashchange', this.hashchangeHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('hashchange', this.hashchangeHandler);
    }

    render(){
        let Child;

        switch(this.state.route){
            case '':
            case '/':
                Child = HomePage;
                break;
            case '/about':
                Child = AboutPage;
                break;
            case '/contacts':
                Child = ContactsPage;
                break;
            default:
                Child = NotFoundPage;
        }

        return (
            <div>
                <ul>
                    <li><a href="#/">Главная</a></li>
                    <li><a href="#/about">О нас</a></li>
                    <li><a href="#/contacts">Контакты</a></li>
                    <li><a href="#/notfound1234">Случайная страница</a></li>
                </ul>
                <div>
                    <Child />
                </div>
            </div>
        );
    }
}

ReactDom.render(
     <AppRouting />, 
    document.getElementById('root')
    );