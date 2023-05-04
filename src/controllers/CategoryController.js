import Category from "../models/Category.js";
import Product from "../models/Product.js";
import * as trace_events from "trace_events";

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        

        const success = req.flash('success');
        const error = req.flash('error');
     

        res.status(200).render('category/getCategories', {
            title: "Categories",
            categories,
            success,
            error,
        });
    } catch (error) {
        req.flash('error', 'Failed to retrieve categories');
        res.status(500).redirect('/categories');
    }
};

export const getCategory = async (req, res, next) => {
    try {
      const categoryID = req.params.id;
      const category = await Category.findById(categoryID);
      if (!category) {
        req.flash('error', 'Category not found');
        return res.status(404).redirect('/categories');
      }
      console.log("Category found:", category);
      res.status(200).render('category/getCategory', {
        title: "Category",
        category,
      });
    } catch (error) {
      console.error(error);
      req.flash('error', 'Failed to retrieve category');
      res.status(500).redirect('/categories');
    }
  };

export const newCategory = (req, res, next) => {
    res.status(200).render('category/createCategory', {
        title: "Create Category",
    });
};

export const postCreateCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;

    const category = await Category.create({
        categoryName,
    })

   

    req.flash('success','Category created');
    res.status(200).redirect('/categories');
}

export const updateCategory = async (req,res,next) => {
    const categoryID = req.params.id;

    const category = await Category.findById({
        _id: categoryID,
    });

    console.log(category);
    res.status(200).render('category/updateCategory', {
        title: "UpdateCategory",
        category: category,
    });
}

export const postUpdateCategory = async (req, res, next) => {
    try {
      const { categoryName, categoryID } = req.body;
  
      const category = await Category.findByIdAndUpdate(categoryID, {
        categoryName,
      }, {
        new: true,
        runValidators: true,
      });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      console.log("Category updated");
      console.log(category);
  
      req.flash('success', 'Category updated');
      res.status(200).redirect('/categories');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Unable to update category');
      res.status(500).redirect('/categories');
    }
  };
  

export const deleteCategory = async (req, res, next) => {
    try {
      const categoryID = req.params.id;
  
      const products = await Product.find({ productCategory: categoryID });
  
      if (products.length > 0) {
        req.flash(
          "error",
          "Cannot delete category because there are products linked to it"
        );
        return res.redirect("/categories");
      }
  
      const deletedCategory = await Category.findByIdAndDelete(categoryID);
  
      if (!deletedCategory) {
        req.flash("error", "Category not found");
        return res.redirect("/categories");
      }
  
      req.flash("success", "Category  deleted");
      res.redirect("/categories");
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while deleting the category");
      res.redirect("/categories");
    }

}
