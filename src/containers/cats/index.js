import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  requestCatImages,
  requestCatFacts,
  removeCatImage,
  removeCatFact
} from '../../components/cats';

const Card = props => (
  <div>
    <img src={props.url} alt={props.text} />
    <p>{props.text}</p>
  </div>
);

const Cards = props => {
  console.log('props from Cards', props);
  const cardComponents = props.cardData.map((d, i) => (
    <Card url={d.imageUrl} text={d.fact} key={i} />
  ));
  return <div>{cardComponents}</div>;
};

class Cats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showCat(props) {
    const { requestCatImages, requestCatFacts } = this.props;
    requestCatImages();
    requestCatFacts();
  }

  hideCat(props) {
    const { removeCatImage, removeCatFact } = this.props;
    removeCatImage();
    removeCatFact();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('nextProps from componentWillUpdate', nextProps);
    // console.log('nextState from componentWillUpdate', nextState);
  }

  render() {
    const { requestCatImages, isRequesting, catImages, catFacts } = this.props;
    console.log('catImages', catImages);
    console.log('catFacts', catFacts);
    const cardData = catImages.map((image, i) => ({
      imageUrl: image.url,
      fact: catFacts[i]
    }));
    return (
      <div>
        <h1>Cats</h1>
        <p>
          <button
            onClick={this.showCat.bind(this, this.props)}
            disabled={isRequesting}
          >
            show me a cat
          </button>
          <button onClick={this.hideCat.bind(this, this.props)}>
            hide a cat
          </button>
        </p>
        {/*<Card url={catImages.url} text={catImages.url} />*/}
        <div>
          <Cards cardData={cardData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isRequesting: state.cats.isRequesting,
  catImages: state.cats.catImages,
  catFacts: state.cats.catFacts
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCatImages,
      requestCatFacts,
      removeCatImage,
      removeCatFact
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cats);
