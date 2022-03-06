const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "products_with_tag",
        },
      ],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "products_with_tag",
        },
      ],
    });
    if (!tagById) {
      res.status(404).json({
        message: `No tag with this ID`,
      });
    }
    res.status(200).json(tagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    if (!req.body) {
      res.status(400).json({
        message: `Bad request`,
      });
    }
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.findByPk(req.params.id);
    if (!updatedTag) {
      res.status(404).json({
        message: `No tag with this ID`,
      });
    }
    updatedTag.update(req.body);
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagById = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagById) {
      res.status(404).json({
        message: `No tag with this ID`,
      });
    }
    res.status(200).json(tagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
