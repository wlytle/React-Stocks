import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor() {
    super();
    this.url = "http://localhost:3000/stocks";
    this.state = {
      stocks: [],
      ownedStocks: [],
      filter: "All",
    };
  }

  componentDidMount() {
    fetch(this.url)
      .then((resp) => resp.json())
      .then((stocks) => {
        this.setState({
          stocks,
        });
      });
  }

  buyStock = ({ currentTarget }) => {
    //find purchased stock
    let boughtStock = this.state.stocks.find(
      (stock) => stock.id === +currentTarget.dataset.id
    );
    // prevetn buying same stock twice
    if (this.state.ownedStocks.includes(boughtStock)) return;
    this.setState((prevState) => {
      return {
        ownedStocks: [boughtStock, ...prevState.ownedStocks],
      };
    });
  };

  sellStock = ({ currentTarget }) => {
    //find sold stock
    this.setState((prevState) => {
      //debugger;
      //****************** WHY THE ACTUAL FUCK DOES THIS NOT WORK!!!!!!!!*******************
      // let soldStockIndex = prevState.ownedStocks.findIndex((stock) => {
      //   stock.id === +currentTarget.dataset.id;
      // });
      let soldStockIndex;
      prevState.ownedStocks.forEach((stock, i) => {
        if (stock.id === +currentTarget.dataset.id) soldStockIndex = i;
      });
      console.log(soldStockIndex);
      prevState.ownedStocks.splice(soldStockIndex, 1);
      return {
        ownedStocks: prevState.ownedStocks,
      };
    });
  };

  sort = ({ target }) => {
    this.setState((prevState) => {
      if (target.value === "Alphabetically") {
        prevState.stocks.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
      } else if (target.value === "Price") {
        prevState.stocks.sort((a, b) => {
          return a.price - b.price;
        });
      }
      return {
        stocks: prevState.stocks,
      };
    });
  };

  // option value="Tech">Tech</option>
  // <option value="Sportswear">Sportswear</option>
  // <option value="Finance">Finance</option>

  filter = ({ target }) => {
    let filter;
    switch (target.value) {
      case "Tech":
        filter = "Tech";
        break;
      case "Sportswear":
        filter = "Sportswear";
        break;
      case "Finance":
        filter = "Finance";
        break;
      default:
        filter = "All";
    }
    this.setState({
      filter,
    });
  };

  render() {
    const filteredStocks =
      this.state.filter === "All"
        ? this.state.stocks
        : this.state.stocks.filter((stock) => stock.type === this.state.filter);
    return (
      <div>
        <SearchBar sort={this.sort} filter={this.filter} />

        <div className="row">
          <div className="col-8">
            <StockContainer buyStock={this.buyStock} stocks={filteredStocks} />
          </div>
          <div className="col-4">
            <PortfolioContainer
              sellStock={this.sellStock}
              stocks={this.state.ownedStocks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
