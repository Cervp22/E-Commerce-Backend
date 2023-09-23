const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ include: { model: Product } });
    res.status(200).json({ message: "id was deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Tags database could not be found!" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });
    !tags
      ? res.status(404).json("Tag id was not found!")
      : res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "tag database not found" });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json({ message: "Creation failed!" });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update(req.body, { where: { id: req.params.id } });
    !updated
      ? res.status(404).json({ message: "Tag could not update!" })
      : res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Update failed!" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "Tage id was not found!" })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
