const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
require("dotenv").config(); // for security purpose
const app = express();

const port = process.env.PORT || 3000;

// Require mongoose
const mongoose = require("mongoose");

// use .env file for storing these values to avoid exposing it
const usernameMongoDB = process.env.MONGODB_USERNAME;
const passwordMongoDB = process.env.MONGODB_PASSWORD;

// Create a new database inside mongodb
mongoose.connect(
  "mongodb+srv://" +
    usernameMongoDB +
    ":" +
    passwordMongoDB +
    "@cluster0.knouguy.mongodb.net/",
  { useNewUrlParser: true }
);

// Create a schema
const itemsSchema = {
  name: String,
};

// Create a model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "This is your Todo-List",
});

const defaultItems = [item1];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

// *****************Mongoose & Schema*******************//

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully saved default items");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  })
  .catch(function (err) {
    console.log(err);
  });
});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName })
    .then((foundlist) => {
      if (!foundlist) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: foundlist.name,
          newListItems: foundlist.items,
        });
      }
    })

    .catch((err) => {
      console.log("Error: ", err.message);
    });

  const list = new List({
    name: customListName,
    items: defaultItems,
  });

  list.save();
});

app.post("/", function (req, res) {
  const listName = req.body.list;
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("successfully deleted item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //create new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        list.save();
        res.redirect("/" + customListName);
      } else {
        // show existing list

        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.listen(port, function () {
  console.log(
    "Server started on",
    this.address().port,
    app.settings.env
  );
});
