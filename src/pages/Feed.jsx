import React from 'react';
import { connect } from 'react-redux';

import * as modalActions from '../actions/ModalActions';
import * as userActions from '../actions/userActions';

import ButtonsBar from '../components/atoms/ButtonsBar';
import IconButton from '../components/atoms/IconButton';
import Accordion from '../components/atoms/Accordion';
import Slider from '../components/organisms/Slider';
import FilterModal from '../components/organisms/FilterModal';
import MatchModal from '../components/organisms/MatchModal';

const Feed = (props) => {
  const handleOpenModal = () => {
    props.turnModalState('FilterModal', true);
  };
  const handleOpenModalMacth = () => {
    props.turnModalState('MatchModal', true);
  };

  return (
    <section>
      <div className="feed">

        <div className="search-button">
          <IconButton iconName="search" space="40px" type="disabled" handleClick={() => handleOpenModal()} />
        </div>

        <Slider/>

        <Accordion
          location="Mexico D.F."
          clothesName="Chamarra"
          NameOwner="Vicente Fernández"
          clothesGenre="Masculino"
          clothesState="Usado"
          clothesInfo=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat commodo consequats" 
        />

        <ButtonsBar
          handleDislike={() => alert('dislike')}
          handleSuperlike={() => alert('superlike')}
          handlelike={() => handleOpenModalMacth()}
        />

      </div>

      <MatchModal
        modalState={props.modalReducers.MatchModalState}
        onCloseModal={() => props.turnModalState('MatchModal', false)}
          nameUserMatch="Vicente Fernández"
      />

      <FilterModal
        modalState={props.modalReducers.FilterModalState}
        onCloseModal={() => props.turnModalState('FilterModal', false)}
      />

    </section>
  );
}

const mapSateToProps = ({ userReducer, modalReducers }) => ({
  userReducer,
  modalReducers,
});

const mapDispatchToProps = {
  ...userActions,
  ...modalActions,
};

export default connect(mapSateToProps, mapDispatchToProps)(Feed);