const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express();

dotenv.config({ path: './config.env' });
require('./Database/conn');

const Buyer = require('./Model/BuyerSchema');
const Products = require('./Model/ProductsSchema');
const Order = require('./Model/OrderSchema');
const Seller = require('./Model/SellerSchema');
const Reviews = require('./Model/ProductReviewSchema');
const Wishlist = require('./Model/WishlistSchema');
const Notifications = require('./Model/NotificationSchema');

const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

// Handle user registration
app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    console.log("UserData: "+ userData.mobileNumber);
    const existingUser = await Buyer.findOne({ email: userData.email });
    // Add validation logic here to ensure data is complete and valid
    if (!userData.name || !userData.email || !userData.password) {
      alert('Incomplete user data');
      return res.status(400).json({ error: 'Incomplete user data' });
    }
    else if (existingUser) {
      alert('User with this email already exists');
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    else 
    {
      const newUser = new Buyer(userData);
      const user = await newUser.save();
      res.status(201).json(user);
      console.log('User saved to the database(BACKEND)');
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user');
    console.log('Error in database');
  }
});



app.post('/register_seller', async (req, res) => {
  try {
    const userData = req.body;
    console.log("UserData: "+ userData.mobileNumber);
    const existingUser = await Seller.findOne({ email: userData.email });
    // Add validation logic here to ensure data is complete and valid
    if (!userData.name || !userData.email || !userData.password) {
      alert('Incomplete user data');
      return res.status(400).json({ error: 'Incomplete user data' });
    }
    else if (existingUser) {
      alert('User with this email already exists');
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    else 
    {
      const newUser = new Seller(userData);
      const user = await newUser.save();
      res.status(201).json(user);
      console.log('User saved to the database(BACKEND)');
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user');
    console.log('Error in database');
  }
});





app.post('/login', async (req,res)=>{
  const { email, password } = req.body;

  try {
    const user = await Buyer.findOne({ email, password });
    console.log(user.id);
    if (user) {
      // User is found, and the credentials match
      res.status(200).json({ success: true, message: 'Login successful', id:user.id });
      
    } else {
      // User not found or incorrect credentials
      res.status(401).json({ success: false, message: 'Login failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/seller_login', async (req,res)=>{
  const { email, password } = req.body;

  try {
    const user = await Seller.findOne({ email, password });

    if (user) {
      // User is found, and the credentials match
      res.json({ success: true, message: 'Login successful' });
    } else {
      // User not found or incorrect credentials
      res.status(401).json({ success: false, message: 'Login failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.post('/verify', async (req, res) => {
  const userData = req.body;

  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'sdpproject74@gmail.com',
        pass: 'hvog wqha iigv oatn',
      }
    });
    const random = Math.floor(Math.random() * 10001);
    const info = await transporter.sendMail({
      from: "sdp_project74@gmail.com" , // sender address
      to: userData.email , // list of receivers
      subject: "User Authentication Code from Heritage Craft Connect✔", // Subject line
      text: `Your Registration Code is ${random}`, // plain text body
  
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({ data: random });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Email could not be sent." });
  }
});

 /*
      console.log("Orders:", JSON.stringify(orders.map(order => ({
        productId: order.product[0]?.productId,
        sellerId: order.product[0]?.productId?.seller,
        buyerId: order.buyerId,
        quantity: order.product[0]?.quantity 
      }), null, 2)));

    */

app.get('/order',async (req,res)=>{
  try {
    const order = await Order.find();
    const orders = await Order.find().populate('product.productId');
    //res.json(orders);
   
    res.json(
      await Promise.all(
        orders.map(async (order, index) => {
          const user = await Buyer.findById(order.buyerId).exec();
          return {
            buyerId: order.buyerId,
            productName: order.product[index].productId.productName,
            quantity: order.product[index].quantity,
            price: order.product[index].productId.price,
            Date: order.date,
            Buyer: user,
          };
        })
      )
    );
      

  } catch(error){
    console.error("ERROR: "+error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
});




app.get('/product-listing', async(req, res)=>{
    try {
        const result = await Products.find();
        // console.log(`Products are ${result}`)
        res.json(result)
    } catch (error) {
        console.log(`Error while fetching products ${error}`)
    }
});

app.get('/individual-product/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        // console.log(id);
        const result = await Products.findById(id);
        // console.log(`The singular product is ${result}`)
        res.json(result);
    } catch (error) {
        console.log(`Error while fetching singular product\n ${error}`)
    }
})
app.get('/buyer_profile', async(req, res)=>{
    try {
        const id = "651adc5c7bea3ef7b5ff632f";
        const result = await Buyer.findById(id);
        res.json(result);
    } catch (error) {
        console.log(`Error while fetching buyer\n ${error}`)
    }
})


//----APIs for Review----
//code for add review for product
app.post('/add/review', async (req, res) => {
  try {
    const { reviewDescription, productId } = req.body;

    // Check if the productId exists in your "Products" model.
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create a new review object
    const newReview = new Reviews({
      reviewDescription,
      product: productId, // Use the "products" reference as specified in your schema
    });

    // Save the review to the database
    await newReview.save();

    res.json({ review: newReview });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//show all buyer
app.get('/buyers', async (req, res) => {
  try {
    // Find all Buyers in the "Buyers" model
    const Buyers = await Buyer.find();

    res.json({ Buyers });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});


//get review using product ID
app.get('/reviews/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find reviews that are associated with the given product ID
    const reviews = await Reviews.find({ product: productId });

    if (reviews.length === 0) 
    {
      res.json({ reviews: 0 });
    } 
    else 
    {
      res.json({ reviews });
    }
    } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//show all reviews
app.get('/reviews', async (req, res) => {
  try {
    // Find all reviews in the "Reviews" model
    const reviews = await Reviews.find();

    res.json({ reviews });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete all reviews
app.delete('/reviews/delete', async (req, res) => {
  try {
    // Delete all reviews in the "Reviews" model
    const result = await Reviews.deleteMany();

    res.json({ message: `Deleted ${result.deletedCount} reviews` });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete review using review ID
app.delete('/review/delete/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Check if the review exists
    const review = await Reviews.findById(reviewId);

    if (!review) {
      return res.json({ message: 'Review not found' });
    }

    // Delete the review
    await Reviews.findByIdAndDelete(reviewId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});


//-------Wishlist APIs-------
//whistlist create
app.post('/create/wishlist', async (req, res) => {
  try {
    const { buyerid, productid } = req.body;

    // Create a new wishlist entry
    const newWishlistItem = new Wishlist({
      buyerID : buyerid,
      productID : productid
    });

    // Save the wishlist item to the database
    await newWishlistItem.save();

    res.json({ wishlistItem: newWishlistItem });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//wishlist get using buyer id
app.get('/wishlist/:buyerID', async (req, res) => {
  try {
    const buyerid = req.params.buyerID;

    // Find wishlist items that belong to the given buyerID
    const wishlistItems = await Wishlist.find({ buyerID: buyerid }).populate('productID');

    if (wishlistItems.length === 0) 
    {
      res.json({ wishlistItems: 0 });
    } 
    else 
    {
      res.json({ wishlistItems });
    }

  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete wishlist using buyer id
app.delete('/delete/wishlist/:buyerID', async (req, res) => {
  try {
    const buyerid = req.params.buyerID;
    // Delete all wishlist items that belong to the given buyerID
    const result = await Wishlist.deleteMany({ buyerID: buyerid });

    res.json({ message: 'Cleared items from the wishlist' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete a single product from the wishlist
app.delete('/delete/product/wishlist/:uid/:productId', async (req, res) => {
  try {
    const { uid, productId } = req.params;

    //look for the item and delete it
    await Wishlist.findOneAndDelete({ buyerID : uid, _id : productId });
    
    res.json({ message: 'Wishlist item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete wishlist item' });
  }
});


//-----Notification APIs-----
//create notification using id
app.post('/add/notifications', async (req, res) => {
  try {
    const { userID, notificationDescription } = req.body;

    // Create a new notification object
    const newNotification = new Notifications({
      userID,
      notificationDescription
    });

    // Save the notification to the database
    await newNotification.save();

    res.status(201).json({ notification: newNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//view notification using user ID
app.get('/get/notifications/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Find notifications that belong to the given userID
    const notifications = await Notifications.find({ userID });

    if (notifications.length === 0) 
    {
      res.status(200).json({ notifications: 0 });
    } 
    else 
    {
      res.status(200).json({ notifications });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete notification of a user
app.delete('/delete/notifications/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Delete all notifications that belong to the given userID
    const result = await Notifications.deleteMany({ userID });

    res.json({ message: 'Delete notifications' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});






app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}/`);
});
