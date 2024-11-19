const express = require("express");
const router = new express.Router();
const items = require("./fakeDb.js");

router.get("/", function(req,res,next){
  res.json({items});
})

router.get("/:name", function (req, res) {
  let item;
  items.forEach( val => {
    if (val.name === req.params.name) {
      item = val;
    }})
  res.json({ item });
})

router.post("/", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  const added = newItem;
  res.status(201).json({ added });
})

router.patch("/:name", function (req, res) {
  let item;
  items.forEach( val => {
    if (val.name === req.params.name) {
      item = val;
    }})
  if (req.body.name) {
    item.name = req.body.name;
  }
  if (req.body.price) {
    item.price = req.body.price;
  }
  const updated = item;
  res.json({ updated })
})

router.delete("/:name", function (req, res) {
  let itemIdx;
  items.forEach( (val,idx) => {
    if (val.name === req.params.name) {
      itemIdx = idx;
    }})
  items.splice(itemIdx, 1);
  res.json({ message: "Deleted" })
})

module.exports = router;