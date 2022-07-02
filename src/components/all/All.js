import React, {Component} from "react";
import Navbar from "../navbar/Navbar";
import { gql } from "apollo-boost";
import {Query} from "react-apollo";
import "../all/all.scss"
import {AiOutlineShoppingCart} from "react-icons/ai"


const POST_QUERY = gql`
query {
  category{
    products{
      name
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
    }
      brand
  }
}
}
   `;
class ALL extends Component {
  constructor(props){
    super(props);
    this.state = {
      filter : ''}
      this.handleFilter = this.handleFilter.bind(this)
    }
  handleFilter = (e) =>{
    const  value   = e.target.value;
     this.state.filter = value
    this.setState({ filter : value});
    console.log(this.state);
   }

    render(){
        return( <div>
          <div className="head">
<Navbar/>
<div>
<select className='converter'  onChange={this.handleFilter}>
    <option value='USD'>$-USD</option>
    <option value='GBP'>£-GBP</option>
    <option value='AUD'>A$-AUD</option>
    <option value='RUB'>₽-RUB</option>
    <option value='JPY'>¥-JPY</option>
</select>

</div>

</div>
<h1 className="All">ALL</h1>
<Query query={POST_QUERY}>
{({loading,data,error}) => {
if (loading){ return 'loading...';}
if (error){
  return <div>Error: {error.toString()}</div>
}
return(
  <div>
{
  <div className="products">
    {data.category.products.map(product =>(
<div className="all">
  <div className="items">
  <img className="item"  src={product.gallery} alt='product' key={product.id}/>
 <div className="stock">
 {(product.inStock === false ) ? 'out of stock!' : '' }
</div>
<div className="border">
  < AiOutlineShoppingCart className="icon"/>
</div>
  <div className="tag">
<div className="name"> {product.name}
</div>
<div className="brand">Producer-{product.brand}</div>
{
[product.prices].map(price =>( <div className="price">
  <div>
{( this.state.filter ===    '') ? [price[0].currency.symbol, price[0].amount] : ''}
{( this.state.filter === 'USD') ? [price[0].currency.symbol, price[0].amount] : ''}
{( this.state.filter === 'GBP') ? [price[1].currency.symbol, price[1].amount] : ''}
{( this.state.filter === 'AUD') ? [price[2].currency.symbol, price[2].amount] : ''}
{( this.state.filter === 'JPY') ? [price[3].currency.symbol, price[3].amount] : ''}
{( this.state.filter === 'RUB') ? [price[4].currency.symbol, price[4].amount] : ''}
</div>
  </div>
))}
</div>
</div>
   </div>
   ))}
</div>
}
  </div>
)
}}</Query>
</div>
)
    }
  }


export default ALL;