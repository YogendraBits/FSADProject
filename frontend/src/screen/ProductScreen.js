import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../Components/Rating';
import { listProductDetails, createProductReview } from '../actions/productActions'; 
import { addTowishlist } from '../actions/wishlistActions'; 
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'; 
import { addToCart } from '../actions/cartActions';
import './ProductScreen.css';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(''); 

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
  };

  const addToWishlistHandler = async () => {
    if (userInfo) {
      try {
        await dispatch(addTowishlist(product._id, qty));
      } catch (error) {
        alert('Failed to add item to wishlist. Please try again.');
      }
    } else {
      alert('Please log in to add items to your wishlist.');
    }
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Button onClick={history.goBack} variant="light" className="mb-3">
        <i className="fas fa-arrow-left mr-2"></i> Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
              <Card className="mt-3">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          className="btn-block"
                          onClick={addToCartHandler}
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add to Cart
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="btn-block"
                          onClick={addToWishlistHandler}
                          type="button"
                        >
                          Add to Wishlist
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Review Section */}
          <Row className="mt-4">
          <Col md={6}>
            <Card className="p-4 mb-4 shadow-sm">
              <h2 className="mb-3">Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className="border-0 mb-3">
                    <div className="p-3 border rounded bg-light">
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                        </div>
                        <div>
                          <small className="text-muted">{review.createdAt.substring(0, 10)}</small>
                        </div>
                      </div>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>


            <Col md={6}>
              <Card className="p-3">
                <h2>Write a Customer Review</h2>
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitReviewHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mb-3"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-3"
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="btn-block">
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review{' '}
                  </Message>
                )}
              </Card>
            </Col>




          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
