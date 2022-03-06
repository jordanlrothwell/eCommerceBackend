const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoriesData = await Category.findAll();
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id);
    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id);
    if (categoryById) {
      const oldCategoryName = categoryById.category_name;
      categoryById.update(req.body);
      res.status(200).json({
        message: `Successfully updated category ${req.params.id} (from '${oldCategoryName}' to '${req.body.category_name}')`,
      });
    } else {
      res
        .status(404)
        .json({ message: `No category found with id '${req.params.id}'` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCategory) {
      res.status(404).json({
        message: `No category found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      message: `Successfully deleted category id ${req.params.id}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
