import { connect } from "react-redux";
import React, { Component } from "react";
import styled from "styled-components";
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <FilterProducts className="filter">
        <Result>{this.props.filteredProducts.length} Products</Result>
        <Sort>
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </Sort>
        <Size>
          Filter{" "}
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </Size>
      </FilterProducts>
    );
  }
}

const FilterProducts = styled.div`
  display: flex;
  padding: 1rem;
  margin: 1rem;
  border-bottom: 0.1rem #c0c0c0 solid;
  justify-content: space-between;
  & .filter {
    flex: 1;
  }
`;
const Result = styled.div`
  flex: 1;
`;
const Sort = styled.div`
  flex: 1;
`;
const Size = styled.div`
  flex: 1;
`;
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
