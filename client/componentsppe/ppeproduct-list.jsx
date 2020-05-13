import React from 'react';
import { withRouter } from 'react-router-dom';
import PPEProductListItem from '../componentsppe/ppeproductlist-item';

class PPEProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.productSection = React.createRef();
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevState) {
    if (this.state.products !== prevState.product) {
      this.productSection.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getProducts() {
    fetch('/api/ppeproducts')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  render() {
    return (
      <React.Fragment>
        <section className="container-fluid">
          <div className="row d-flex flex-column align-items-center justify-content-center ppemain-img">
            <div className="display-3">Website Demo</div>
            <div className="h1 mb-5">Subtitles and text descriptions</div>
            <button className="mt-5 px-5 py-3 btn btn-warning font-weight-bold btn-lg"
              onClick={() => this.productSection.current.scrollIntoView({ behavior: 'smooth' })}
            >Explore</button>
          </div>
        </section>
        <section className="container-fluid bg-lightblue">
          <h1 className="text-center pt-4 mb-4" ref={this.productSection}>Our Products</h1>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-lg-8 col-md-12">
              <div className="row">
                {
                  this.state.products.map(product => {
                    return (<PPEProductListItem
                      key={product.productId}
                      products={product}
                    />);
                  })
                }
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withRouter(PPEProductList);
