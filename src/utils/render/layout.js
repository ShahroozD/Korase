

const layout = (title, child) => (`
<!doctype html>
<html dir="auto">
  <head>
    <meta charSet="utf-8" />
    <meta name="description" content="Static sample" />
    <meta content="initial-scale=1, minimum-scale=1, width=device-width" name="viewport"></meta>
    <link rel="icon" type="image/png" href="./imgs/favicon.png"></link>
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script  src="https://unpkg.com/shahneshan/dist/markdownParser.cjs.js"></script>

    <link rel="stylesheet" href="/styles.css"></link>
    <title>${title}</title>
  </head>
  <body>
    <div id="root">${child}</div>
    <script src="/scripts/script.js"></script>
  </body>
</html>
`)

export default layout;