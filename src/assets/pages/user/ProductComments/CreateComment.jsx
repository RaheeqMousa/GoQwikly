import React, { useState, useContext } from 'react';
import style from './Comment.module.css';
import { FaStar } from 'react-icons/fa6';
import { FaStarHalf } from 'react-icons/fa6';
import Loader from '../../../component/user/Loader/Loader';
import axios from 'axios';
import { UserContext } from '../../../component/user/context/UserContext';
import defaultPic from './defaultPicture.jpg';
import { useForm } from 'react-hook-form';

export default function CreateComment({ item }) {
  const { user } = useContext(UserContext);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitReview = async (data) => {
    // Validation is handled by react-hook-form, no need to manually check if comment is empty
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('userToken'); // Corrected method for getting the token
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/products/${item}/review`,
        data,
        {
          headers: {
            'Authorization':`Tariq__${token}`,
          }
        }
      );
      console.log('Review submitted:', response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitReview)}
        className={`w-75 border rounded px-2 py-3 ${style.commentBox} d-flex justify-content-center align-items-start flex-column gap-3`}
      >
        {error && <p className="text-red">{error}</p>}
        <div className="d-flex gap-2">
          {user.image.secure_url ? (
            <img src={user.image.secure_url} alt="user" size={20} className="rounded" />
          ) : (
            <img src={defaultPic} alt="default" size={20} className="rounded" />
          )}
          <h4>{user.userName}</h4>
        </div>

        {/* Textarea for the comment */}
        <textarea
          id="floatingTextarea"
          placeholder="Write a review..."
          {...register("comment", { required: "Comment is required" })}
          className="form-control"
        />
        {/* Display error message for comment */}
        {errors.comment && <p className={`${style.tred}`}>{errors.comment.message}</p>}

        {/* Rating input */}
        <div className="d-flex gap-2">
          <label htmlFor="rating">Rating: </label>
          <input
            type="number"
            min={0}
            max={5}
            id="rating"
            className="rounded"
            {...register("rating", { required: "Rating is required" })}
          />
        </div>
        {/* Display error message for rating */}
        {errors.rating && <p className={`${style.tred}`}>{errors.rating.message}</p>}

        <button type="submit" disabled={Loading} className="btn btn-dark rounded">
          {Loading ? "Loading..." : "Submit Review"}
        </button>
      </form>
    </>
  );
}
