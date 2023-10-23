const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const port = process.env.PORT || 3000;

const _ = require("lodash")

// Require mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));


async function main() {
  // Create a new database inside mongodb
  await mongoose.connect("mongodb+srv://therahman:Tz76QFtxgEasUpU8@todolist.sfq009f.mongodb.net/Todolist");
}

// Create a schema
const itemsSchema = new mongoose.Schema ({
  name: String
});

// Create a model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "This is your Todo-List"

});

const item2 = new Item({
  name: "Add a new todo"  
});

const item3 = new Item({
  name: "Delete todos that are finished"  
});


const defaultItems = [ item1, item2, item3 ];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

// *****************Mongoose & Schema*******************//

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {
const day = date.getDate();

Item.find({})
.then(function (foundItems) {

  if(foundItems.length === 0) {
    Item.insertMany(defaultItems)

    res.redirect("/");
  } else {
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  }
})

.catch(function(err){
  console.log(err);
})

});


app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName})
  .then(foundlist => {

    if(!foundlist){
 
      const list = new List({
        name: customListName,
        items: defaultItems
      });

      list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", {listTitle: foundlist.name, newListItems: foundlist.items});
    }
  })

  .catch((err)=>{
    console.log("Error: ", err.message);
})


  const list = new List ({
    name: customListName,
    items: defaultItems
  })

  list.save();
})


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item ({  
    name: itemName
  });

  if(listName === "Today") {

    item.save();
    res.redirect("/");

  } else {

    List.findOne({name: listName})

    .then(foundlist => {
      foundlist.items.push(item);
      foundlist.save();
      res.redirect("/" + listName)          
    })

    .catch((err)=>{
      console.log("Error: ", err.message);
  })
  }
});


app.post("/delete", async(req, res) => {
const checkedItemId = req.body.checkbox;
const hiddenListName = req.body.hiddenListName;



if(hiddenListName === "Today") {
  await Item.findByIdAndDelete(checkedItemId);
  res.redirect("/")

} else{

  await List.findOneAndUpdate( {name: hiddenListName}, {$pull: { items: { _id: checkedItemId } } } )
  res.redirect("/" + hiddenListName);
}
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(port, function() {
  console.log(`Server started on ${port}`);
});
