import React, { Component } from "react";
import Coin from "../Coin/Coin";
import "./CoinFlipper.css";

const options = ["Yazı", "Tura"];

const getRandomElement = (arr) => {
  const randomItem = arr[Math.floor(Math.random() * arr.length)];
  return randomItem;
};
const findTotal = (arr, item) => {
  const targetItems = arr.filter((arrItem) => {
    return arrItem === item;
  });
  return targetItems.length;
};

class CoinFlipper extends Component {
  constructor(props) {
    super(props);
    // State üzerinde paranın başlangıçtaki durumunu veriyoruz, başlangıçta "tura" olsun.
    // Daha sonra şu anda paranın dönüp dönmeme durumunu da veriyoruz, başlangıçta para atılmamış olduğundan "false" olarak verdik.
    this.state = {
      side: options[0],
      flipping: false,
      flipsArray: [],
    };
  }
  handleClick = () => {
    // "At!" butonuna tıkladığımızda paranın dönmesini istiyoruz, bu yüzden "flipping" durumunu "true" yapıyoruz.
    this.setState({ flipping: true });
    const randomElement = getRandomElement(options);
    // 1 saniye kadar dönmesi yeterli, bu yüzden 1 saniye sonra "flipping" durmunu tekrar "false" yapıyoruz.
    setTimeout(
      () =>
        this.setState({ flipping: false }, () => {
          this.setState({
            side: randomElement,
            // flipsArray: [...this.state.flipsArray].concat([randomElement]),
            flipsArray: this.state.flipsArray.concat(randomElement),
          });
        }),
      500
    );
  };

  render() {
    return (
      <div className="CoinFlipper">
        <h1>Yazı mı Tura mı?</h1>
        <Coin side={this.state.side} flipping={this.state.flipping} />
        <button onClick={this.handleClick}>At!</button>
        <p>
          Toplam
          <strong> {this.state.flipsArray.length} </strong>
          atıştan

          <div>
          {options.map((option) => {
              return (
                <div key={option}>
                  <strong> {findTotal(this.state.flipsArray, option)} </strong>
                  {option}
                </div>
              );
            })}
          </div>
        </p>
      </div>
    );
  }
}

export default CoinFlipper;
