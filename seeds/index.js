const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campgrounds");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "645913e11e34cff9c67624ec",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Meow and walk away take a deep sniff of sock then walk around with mouth half open use lap as chair stare out the window, so run outside as soon as door open ignore the human until she needs to get up, then climb on her lap and sprawl. You are a captive audience while sitting on the toilet, pet me wake up wander around the house making large amounts of noise",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dq8illray/image/upload/v1683838912/YelpCamp/djs37phjcbiz7mya0vfy.jpg",
          filename: "YelpCamp/djs37phjcbiz7mya0vfy",
        },
        {
          url: "https://res.cloudinary.com/dq8illray/image/upload/v1683855575/YelpCamp/zsrmymwkaxfzypuyxdtn.jpg",
          filename: "YelpCamp/zsrmymwkaxfzypuyxdtn",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
