{{!-- Import Bootstrap CSS --}}
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

{{!-- Takes a post object --}}
<section class="post-full mt-5 p-3 rounded bg-white border">
    <h2 class="display-4">{{title}}</h2>
    <p class="text-muted"><small>Author: {{user.username}}</small></p>
    <p class="text-muted"><small>Posted on: {{formatDate date_created}}</small></p>
    <p>{{content}}</p>
</section>

{{!-- TODO Add partials for associated comments --}}
{{#if logged_in}}
{{#if_eq user.id user_id}}
    <button id='delete-post-button' data-postid={{id}} class="btn btn-danger mt-3">Delete</button>
    <button class="btn btn-warning mt-3 ml-2"><a href="/dashboard/edit/{{id}}" class="text-white">Edit</a></button>
{{/if_eq}}
<section class="mt-5">
{{#each comment}}
<div class="post p-3 rounded bg-light border mb-3">
    <p>by {{ user.username }} on {{formatDate date_created}}</p>
    <p>{{comment_text}}</p>
</div>
{{/each}}   
</section>
<section class="comment-form mt-5" id="commentForm">
    {{!-- TODO Use form action and method to make a post request with the comment data --}}
    <form action="/dashboard/{{id}}/addComment" method="POST" class="p-3 rounded bg-white border">
        <div class="form-group">
            <label for="comment_text">Add a comment:</label>
            <textarea class="form-control" id="comment_text" name="comment_text" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>
{{/if}}

<script src="/js/addComment.js"></script>
