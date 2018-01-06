import React from 'react';

import {storiesOf} from '@storybook/react';
import {linkTo} from '@storybook/addon-links';

import {Button, Welcome} from '@storybook/react/demo';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../components/Profile.css'
import {Profile} from '../components/Profile'
import {ProfileRegisterInfo} from '../components/ProfileRegisterInfo';
import {ProfileOriginals} from "../components/ProfileOriginals";
import {ProfileStats} from "../components/ProfileStats";
import {ProfileNavBar} from "../components/ProfileNavBar";

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>);

let profile = {
    'idpid': 100200300,
    'firstname': 'Борис',
    'lastname': 'Ельцин',
    'secondname': 'Николаевич',
    'gender': 'М',
    'age': '56',
    'photos_amount': 2,
    'sounds_amount': 25,
    'photos': ["iVBORw0KGgoAAAANSUhEUgAAAAUA\n" +
    "AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO\n" +
    "    9TXL0Y4OHwAAAABJRU5ErkJggg=="],
    "verifies_amount": 20,
    "verifies_confirmed": 15,
    "adaptations": 0,
};

storiesOf('Блоки информации по отдельности', module)
    .add('Блок метаинформации', () =>
        <ProfileRegisterInfo profile={profile}/>)
    .add('Блок оригиналов', () =>
        <ProfileOriginals profile={profile}/>)
    .add('Блок статистики', () =>
        <ProfileStats profile={profile}/>)
    .add('Блок навигации', () =>
        <ProfileNavBar profile={profile}/>);

storiesOf('Компоновка профиля регистрации/верификации', module)
    .add('Компоновка №1', () =>
        <Profile profile={profile}/>);
