import { html } from "../../node_modules/lit-html/lit-html.js";
import { getHomeCategories } from "../api/data.js";

const categoryTemplate = (category) => html` 
<section class="recent java">
        <h2>${category.category}</h2>
        <article>
            ${!category.title? 
            html`<h3 class="no-articles">No articles yet</h3>`:html`
            <h3>${category.title}</h3>
            <p>${category.content}</p>
            <a href="/details/${category._id}" class="btn details-btn">Details</a>
            `}
        </article>
    </section>`;



const homeTemplate = (data) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
  
    
  <section class="recent js">
      <h2>JavaScript</h2>
      <article>
            ${!data.js? 
            html`<h3 class="no-articles">No articles yet</h3>`:html`
            <h3>${data.js.title}</h3>
            <p>${data.js.content}</p>
            <a href="/details/${data.js._id}" class="btn details-btn">Details</a>
            `}
        </article>
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        <article>
        ${!data.c? 
            html`<h3 class="no-articles">No articles yet</h3>`:html`
            <h3>${data.c.title}</h3>
            <p>${data.c.content}</p>
            <a href="/details/${data.c._id}" class="btn details-btn">Details</a>
            `}
        </article>
    </section>
        <section class="recent java">
        <h2>Java</h2>
        <article>
        ${!data.java? 
            html`<h3 class="no-articles">No articles yet</h3>`
            :html`
            <h3>${data.java.title}</h3>
            <p>${data.java.content}</p>
            <a href="/details/${data.java._id}" class="btn details-btn">Details</a>
            `}
        </article>
    </section>
    <section class="recent python">
        <h2>Python</h2>
        <article>
        ${!data.python? 
            html`<h3 class="no-articles">No articles yet</h3>`:html`
            <h3>${data.python.title}</h3>
            <p>${data.python.content}</p>
            <a href="/details/${data.python._id}" class="btn details-btn">Details</a>
            `}
        </article>
    </section>
</section>
`; 
export async function homePage(ctx){
    const categories =await getHomeCategories()
    const data = {
        js:categories.find(c=>c.category=='JavaScript'),
        c:categories.find(c=>c.category=='C#'),
        java:categories.find(c=>c.category=='Java'),
        python:categories.find(c=>c.category=='Python'),
    }
    console.log(categories.find(c=>c.category=='JavaScript'))
    console.log(data)
    ctx.render(homeTemplate(data))
 
}