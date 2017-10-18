import React from 'react';
import { push } from 'react-router-redux';
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
  </div>
);

const mapStateToProps = state => ({
  isRequesting: state.cats.isRequesting
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCatImages
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cats);
