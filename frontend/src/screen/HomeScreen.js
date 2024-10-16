import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product";
import Message from '../Components/Message';
import Loader from "../Components/Loader";
import Paginate from "../Components/Paginate";
import ProductCarousel from "../Components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom"; // Import useParams

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams(); // Use useParams to get parameters
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber || 1)); // Default pageNumber to 1 if not provided
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword || ""} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
