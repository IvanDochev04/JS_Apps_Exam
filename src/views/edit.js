import { html } from "../../node_modules/lit-html/lit-html.js";
import { getDetails, editRecord } from "../api/data.js";

const editTemplate = (article, onSubmit) => html`\
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" .value=${article.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${article.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;

export async function editPage(ctx){
    const article = await getDetails(ctx.params.id);
    ctx.render(editTemplate(article,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = {
            title: formData.get('title'),
            category: formData.get('category'),
            content: formData.get('content'),
        }
        if(!data.title || !data.content ||!data.category){
        window.alert('All fields are required!')
        }
        else if(data.category !="JavaScript"&&data.category != "C#"&&data.category != "Java"&& data.category !="Python"){
            window.alert('Invalid category!') 
        }
        else{
           await editRecord(ctx.params.id,data);
           ctx.page.redirect('/details/'+ctx.params.id)
        }

    }
}
