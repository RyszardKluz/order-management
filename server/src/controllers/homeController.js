const index = (req, res) => {
  res.send('Hello world!');
};

const homeController = {
  index,
};

export { homeController };
