const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// item model

const Item = require("../../models/Item");

// get request to api/ items
// getall items
// access Public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// post request to api/ items
// add items
// access Private

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// delete request request to api/items/:id
// delete items
// access Private

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;
