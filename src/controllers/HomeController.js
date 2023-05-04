export const getHomePage = (req,res, next) => {
    res.render('home', {
        title: "HomePage",
    })
};