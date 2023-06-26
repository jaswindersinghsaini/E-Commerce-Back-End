const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categProduct = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!categProduct) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(categProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCateg = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCateg[0]) {
      res.status(404).json({ message: "No product with this id!" });
      return;
    }
    res.status(200).json(updateCateg);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCateg = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCateg) {
      res.status(404).json({ message: "No Products found with this id" });
      return;
    }
    res.status(200).json(deleteCateg);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
