const { STATUS_CODE } = require("../constants/statusCode");
const express = require("express");
const { MENU_LINKS } = require("../constants/navigation");
const productsSlice = require("../store/products");

const router = express.Router();

router.get("/add", (req, res) => {
  res.render("add-product", {
    headTitle: "Add new product",
    path: "/products/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
});

router.post("/add", (req, res) => {
  const { name, description } = req.body;

  const newProduct = { name, description };
  productsSlice.newestProduct = newProduct;
  productsSlice.products.push(newProduct);

  res.status(STATUS_CODE.FOUND).redirect("/products/new");
});

router.get("/new", (_req, res) => {
  res.render("new-product", {
    headTitle: "Shop - newest product",
    path: "/products/new",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/new",
    newestProduct: productsSlice.newestProduct,
  });
});

router.get("/", (_req, res) => {
  res.render("products", {
    headTitle: "Shop - products",
    path: "/products",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products: productsSlice.products,
  });
});

module.exports = router;
