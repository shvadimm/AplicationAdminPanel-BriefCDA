import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    console.log("Products found");
    console.log(products);

    const success = req.flash("success");
    const error = req.flash("error");
    console.log(success);
    console.log(error);

    res.status(200).render("product/getProducts", {
      title: "ProductList",
      products,
      success,
      error,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products");
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { id: categoryID } = req.params;

    const category = await Category.findById(categoryID);

    const products = await Product.find({ productCategory: categoryID });

    console.log(products);

    res.status(200).render("product/getProductsByCategory", {
      title: "CategoryProductList",
      category,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products");
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id: productID } = req.params;

    const product = await Product.findById(productID);

    const category = await Category.findById(product.productCategory);

    console.log("Product found");
    console.log(product);

    res.status(200).render("product/getProduct", {
      title: "Product",
      category,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Product not found");
  }
};

export const newProduct = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).render("product/createProduct", {
      title: "NewProduct",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching categories");
  }
};

export const postCreateProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const { productName, productPrice, productDescription, productCategory } =
      req.body;

    const product = await Product.create({
      productName,
      productPrice,
      productDescription,
      productCategory,
    });

    console.log("Product created");
    console.log(product);

    req.flash("success", "Product successfully created");
    res.status(201).redirect("/products");
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred while creating product");
    res.status(500).redirect("/products/new");
  }
};

export const updateProduct = async (req, res, next) => {
    try {
      const productID = req.params.id;
  
      const product = await Product.findById(productID);
      if (!product) {
        return res.status(404).render('error', {
          title: "Product not found",
          message: "The product you are looking for does not exist.",
        });
      }
  
      const categories = await Category.find();
  
      const category = await Category.findById(product.productCategory);
      if (!category) {
        return res.status(404).render('error', {
          title: "Category not found",
          message: "The category associated with the product does not exist.",
        });
      }
  
      res.status(200).render('product/updateProduct', {
        title: "Update Product",
        categories: categories,
        categoryProduct: category,
        product: product,
      });
  
    } catch (error) {
      next(error);
    }
  }

  export const postUpdateProduct = async (req, res, next) => {
    try {
        const productID = req.body.productID;
        const product = await Product.findById(productID);

        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }

        const { productName, productPrice, productDescription, productCategory } = req.body;
        product.productName = productName;
        product.productPrice = productPrice;
        product.productDescription = productDescription;
        product.productCategory = productCategory;
        await product.save();

        req.flash('success', 'Product successfully updated');
        res.redirect('/products');
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const productID = req.params.id;
        const product = await Product.findById(productID);

        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }

        await product.remove();

        req.flash('success', 'Product successfully deleted');
        res.redirect('/products');
    } catch (error) {
        next(error);
    }
};