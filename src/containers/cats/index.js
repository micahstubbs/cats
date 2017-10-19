import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestCatImages } from '../../components/cats';

const Card = props => (
  <div>
    <img src={props.url} alt={props.text} />
    <p>{props.text}</p>
  </div>
);

const Cards = props => {
  const cardComponents = props.cardData.map((d, i) => (
    <Card url={d.url} text={d.text} key={i} />
  ));
  return <div>{cardComponents}</div>;
};

class Cats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('nextProps from componentWillUpdate', nextProps);
    console.log('nextState from componentWillUpdate', nextState);
  }

  render() {
    const { requestCatImages, isRequesting, catImages } = this.props;

    return (
      <div>
        <h1>Cats</h1>
        <p>
          <button onClick={requestCatImages} disabled={isRequesting}>
            show me a cat
          </button>
        </p>
        {/*<Card url={catImages.url} text={catImages.url} />*/}
        <div>
          <Cards cardData={catImages} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isRequesting: state.cats.isRequesting,
  catImages: state.cats.catImages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCatImages
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cats);
