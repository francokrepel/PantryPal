const User = require('../models/user')

const handleFavorite = async (req, res) => {
    const { userId, recipeId } = req.body;
    console.log(userId)
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const index = user.savedRecipes.indexOf(recipeId);
        if (index !== -1) {
            // Recipe is already favorited, remove it
            user.savedRecipes.splice(index, 1);
            await user.save();
            return res.status(200).json({ message: "Recipe removed from favorites!" });
        } else {
            // Recipe not in favorites, add it
            user.savedRecipes.push(recipeId);
            await user.save();
            return res.status(200).json({ message: "Recipe added to favorites!" });
        }
    } catch (error) {
        console.error("Error handling favorites:", error);
        res.status(500).json({ error: 'Failed to update favorites' });
    }
};

const getFavorites = async (req, res) => {
    const { userId } = req.query; // Change from req.body to req.query
    try {
        const user = await User.findById(userId).populate('savedRecipes');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.savedRecipes);
    } catch (error) {
        console.error("Error fetching favorited recipes:", error);
        res.status(500).json({ error: 'Error fetching favorited recipes' });
    }
};


module.exports = {
    handleFavorite,
    getFavorites
}