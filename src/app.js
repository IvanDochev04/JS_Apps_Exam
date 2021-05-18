import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import { logout } from './api/api.js';


import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { allPage } from './views/all.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';


export const main = document.querySelector('main');
page('/', decoration, homePage);
page('/login', decoration, loginPage);
page('/register', decoration, registerPage);
page('/all', decoration, allPage)
page('/create', decoration, createPage);
page('/details/:id',decoration,detailsPage)
page('/edit/:id',decoration,editPage)


setUserNav();
page.start();


document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    console.log('logout')
    page.redirect('/');
    setUserNav();    
})

function decoration(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();

}



function setUserNav(){
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken != null){
       console.log(`Welcome, ${accessToken}`);
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}