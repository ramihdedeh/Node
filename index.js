const http = require("http");
const fs = require("fs");
const path = require("path");

// Helper function to serve files
const serveFile = (filePath, contentType, response) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error", "utf-8");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
};

// Create the server
const server = http.createServer((req, res) => {
  let filePath = "";
  let contentType = "text/html";

  // Route handling
  switch (req.url) {
    case "/":
      filePath = path.join(__dirname, "index.html");
      break;
    case "/about":
      filePath = path.join(__dirname, "about.html");
      break;
    case "/contact-me":
      filePath = path.join(__dirname, "contact-me.html");
      break;
    default:
      filePath = path.join(__dirname, "404.html");
      res.writeHead(404); // Explicitly set 404 status code for non-matching routes
  }

  // Serve the requested file
  serveFile(filePath, contentType, res);
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
