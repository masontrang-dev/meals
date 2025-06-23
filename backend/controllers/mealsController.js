const getMeals = (req, res) => {
  res.json([
    { id: 1, name: "Spaghetti" },
    { id: 2, name: "Bibimbap" },
  ]);
};

module.exports = { getMeals };
