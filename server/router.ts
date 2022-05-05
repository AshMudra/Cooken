const router = require('express').Router();
const userController = require('./controllers/user');
const recipeController = require('./controllers/recipes');
 
//recipe routes//
//gets random "wildcard" recipe
router.get('/recipe', recipeController.getRandomRecipe);
//gets recipe based on cuisine type generated by user food pref & difficulty selected
router.get('/recipe/:cuisineTag/:difficulty', recipeController.getRecipeByCuisine);
//just to fill db
router.post('/recipe', recipeController.AddRecipe);

//user routes
// register new user
router.post('/register', userController.createUser);
//login user
router.post('/login', userController.loginUser);
//view profile info once authenticated
router.get('/profile', userController.profileInfo);
//logout user
router.post('/logout', userController.logoutUser);

module.exports = router;