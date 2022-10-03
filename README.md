# html-imports

This project aims to allow the development of simple static pages, websites, and templates comfortably, without needing to use any huge library or framework for this purpose. With it, you do not need to edit a line of code in many files if you only need to change some minor stuff.

### How to use

To use it, add the script file inside the dist/ folder to your HTML page, and you can start creating components to avoid rewriting the same code in all of your pages. For instance, you can create a file named "navbar.html" to your navbar and, in the pages that use this component, just put the following code:

```html
<app-include src="path-to-the-file/navbar"></app-include>
```

As you can see, you have to use the tag _app-include_ to import your HTML file. Always remember to close that tag, or it may cause trouble. Note that, you do not have to put the file extension.
If you open a _script_ tag inside your component, the scripts inside it will not execute, but you can change this behavior by adding the '_inComponent_' attribute to your script tag.

```html
<ul>
    <li>Home</li>
    <li>About</li>
</ul>

<script inComponent>
    console.log('hey!');
</script>
```
