import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestCatImages } from '../../components/cats';

const Cats = props => (
  <div>
    <h1>Cats</h1>
    <p>
      <button onClick={props.requestCatImages} disabled={props.isRequesting}>
        show me some cats
      </button>
    </p>
    <img src={props.catImages.url}></img>
  </div>
);

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
