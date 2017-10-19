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
  const cardComponents = props.cardData.map(d => <Card url={d.url} text={d.text} />);
  return <div>{cardComponents}</div>
};

class Cats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate() {}

  render() {
    const { requestCatImages, isRequesting, catImages } = this.props;

    const catsData = [
      {
        url: 'http://25.media.tumblr.com/tumblr_li262w7fMR1qgnva2o1_250.jpg',
        text: 'some text'
      },
      {
        url: 'http://25.media.tumblr.com/tumblr_li262w7fMR1qgnva2o1_250.jpg',
        text: 'some text'
      }
    ];

    return (
      <div>
        <h1>Cats</h1>
        <p>
          <button onClick={requestCatImages} disabled={isRequesting}>
            show me some cats
          </button>
        </p>
        {/*<Card url={catImages.url} text={catImages.url} />*/}
        <div>
          <Cards cardData={catsData} />
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
