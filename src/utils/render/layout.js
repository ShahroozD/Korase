

const layout = (title, child) => (`
<!doctype html>
<html dir="auto">
  <head>
    <meta charSet="utf-8" />
    <meta name="description" content="Static sample" />
    <meta content="initial-scale=1, minimum-scale=1, width=device-width" name="viewport"></meta>
    <link rel="icon" type="image/png" href="./imgs/favicon.png"></link>
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
    <script  src="https://unpkg.com/shahneshan/dist/markdownParser.js"></script>

    <link rel="stylesheet" href="/styles.css"></link>
    <title>${title}</title>
  </head>
  <body>
    <div id="root">${child}</div>
  </body>
</html>
`)

export default layout;