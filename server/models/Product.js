import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  images: [
    {
      id: String,
      url: String,
    },
  ],

  sold: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

//   reviews: [
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     name: String,
//     rating: Number,
//     comment: String,
//   },
// ],


reviews: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    rating: Number,
    comment: String,

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],

numReviews: {
  type: Number,
  default: 0,
},

rating: {
  type: Number,
  default: 0, // average rating
},

});

export const Product = mongoose.model("Product", productSchema);