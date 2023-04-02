import express from "express";
import path, { resolve } from "path";
import bodyParser from "body-parser";

const port = 8080;
const app = express();
app.set("view engine", "ejs");

// app.use(express.static(path.resolve("public")));

app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// bodyParser udah deprecated
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use("/", (req, res, next) => {
  let authHeader = req.headers.authorization;
  // console.log(req.headers);
  // console.log(authHeader);

  if (!authHeader) {
    let err = new Error("not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  } else {
    let auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    let username = auth[0];
    let password = auth[1];

    if (username === "topcoder" && password === "rocks") {
      res.status = 200;
      next();
    } else {
      let err = new Error("not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  }
});

app.get("/", (req, res, next) => {
  res.render("survey");
});

app.listen(port, () => {
  console.log("running on port 8080");
});

app.post("/survey", async (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let fruit = req.body.favoriteFruit;

  console.log(name);
  console.log(age);
  console.log(fruit);
  res.render("Res");
})