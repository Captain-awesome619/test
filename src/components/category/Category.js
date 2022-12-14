import React from 'react'
import {graphql} from 'react-apollo'
import { connect } from 'react-redux'
import ProductItem from '../productCard/productItem'
import "../category/category.scss"
import { ALLPRODUCTS } from '../../queries/queries'


 class Category extends React.Component {
    Prod(data) {
        return data.category.products.map((product) => (
          <ProductItem
            key={product.id}
            data={product}
            currency={this.props.activeCurrency}
          />
        ));
      }

      render() {
        const data = this.props.data;

        if (data.loading) {
            return <h2>getting products.</h2>;
          }

        return (
          <div className="CategoryPage">

            <div className="categorytitle">
              {this.props.categoryName}
            </div>

            <div className="Products">
              {this.Prod(data)}
            </div>
          </div>
        );
      }
    }

    export default connect((state) => ({
      categoryName: state.category.activeCategoryName,
      activeCurrency: state.currency.activeCurrency,
    }))(
      graphql(ALLPRODUCTS, {
        options: (props) => {
          return {
            variables: {
              type: props.categoryName,
            },
            fetchPolicy: "no-cache",
          };
        },
      })(Category)
    );


