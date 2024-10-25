<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Message</title>
    <style>
      <?php include "style.css" ?>
    </style>
  </head>
  <body class="cont-green">
    <h2 class="h-contactgreen">
      Good job!
      <?php echo $_GET["name"]; ?>
      <br />
      Your message has been sent. We will reply as soon as possible. Do check
      your mail (<?php echo $_GET["email"]; ?>) in the next hour.
    </h2>
    <br />
    <a target="_self" class="greenlink" href="index.html"
      >Go back to the homepage</a
    >
  </body>
</html>
