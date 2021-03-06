import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as modalActions from '../../actions/ModalActions';
import * as userActions from '../../actions/userActions';

import Modal from './Modal';
import AddImage from '../atoms/AddImage';
import Button from '../atoms/Button';
import InputSelect from '../atoms/InputSelect';

const EditClotheModal = ({ getUserClothes, deleteClothe, getClotheData, turnModalState, editClothe, modalReducers: { EditClotheModalState }, userReducer: { clotheId, clotheData } }) => {
  const data = localStorage.getItem('user');
  const jsonData = JSON.parse(data);
  const { token } = jsonData;
  const { id, description, category, color, gender, picture, picture2, picture3, size, state } = clotheData;

  const image01 = document.getElementById('inputChange01');
  const image02 = document.getElementById('inputChange02');
  const image03 = document.getElementById('inputChange03');

  if (clotheId) {
    getClotheData(clotheId, token);
  }

  if (document.getElementById('imageChange01')) {
    document.getElementById('imageChange01').innerHTML = `<img src=${picture} alt=${'Sin vista previa'} width="100%" height="100%" />`;
    document.getElementById('imageChange02').innerHTML = `<img src=${picture2} alt=${'Sin vista previa'} width="100%" height="100%" />`;
    document.getElementById('imageChange03').innerHTML = `<img src=${picture3} alt=${'Sin vista previa'} width="100%" height="100%" />`;
  }

  const previewFile01 = () => {
    const fileInput01 = document.getElementById('inputChange01');
    if (fileInput01.files && fileInput01.files[0]) {
      const view = new FileReader();
      view.onload = (e) => {
        document.getElementById('imageChange01').innerHTML = `<img src=${e.target.result} alt=${'Sin vista previa'} width="100%" height="100%" />`;
      };
      view.readAsDataURL(fileInput01.files[0]);
    }
  };

  const previewFile02 = () => {
    const fileInput02 = document.getElementById('inputChange02');
    if (fileInput02.files && fileInput02.files[0]) {
      const view = new FileReader();
      view.onload = (e) => {
        document.getElementById('imageChange02').innerHTML = `<img src=${e.target.result} alt=${'Sin vista previa'} width="100%" height="100%" />`;
      };
      view.readAsDataURL(fileInput02.files[0]);
    }
  };

  const previewFile03 = () => {
    const fileInput03 = document.getElementById('inputChange03');
    if (fileInput03.files && fileInput03.files[0]) {
      const view = new FileReader();
      view.onload = (e) => {
        document.getElementById('imageChange03').innerHTML = `<img src=${e.target.result} alt=${'Sin vista previa'} width="100%" height="100%" />`;
      };
      view.readAsDataURL(fileInput03.files[0]);
    }
  };

  const [fields, setField] = useState(0);
  const handleChange = (ev) => {
    setField({
      ...fields,
      [ev.target.name]: ev.target.value,
    });
    previewFile01();
    previewFile02();
    previewFile03();
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await editClothe(fields, id, token, image01, image02, image03);
    await turnModalState('EditClotheModal', false);
    await getUserClothes(token);
  };

  return (
    <Modal
      modalState={EditClotheModalState}
      onCloseModal={() => { turnModalState('EditClotheModal', false); }}
      closeButton
    >
      <form className="clothe modal__scroll" onSubmit={handleSubmit}>
        <center><h2>Editar prenda</h2></center>
        <div className="clothe__description">
          <h4>Descripción:</h4>
          <textarea
            className="description__clothe"
            name="description"
            placeholder="descripcion"
            defaultValue={description}
            onChange={handleChange}
          />
        </div>
        <h4>Imágenes</h4>
        <div className="clothe__images">
          <AddImage
            id="inputChange01"
            idLabel="imageChange01"
            name="clotheImage"
            onChange={handleChange}
          />
          <AddImage
            id="inputChange02"
            idLabel="imageChange02"
            name="clotheImage"
            onChange={handleChange}
          />
          <AddImage
            id="inputChange03"
            idLabel="imageChange03"
            name="clotheImage"
            onChange={handleChange}
          />
        </div>
        <div className="clothe__details">
          <h4>Detalles</h4>
          <InputSelect
            label="Categoria"
            name="category"
            onChange={handleChange}
          >
            <option select="true" defaultValue={category}>{category}</option>
            <option>Abrigo</option>
            <option>Blusa</option>
            <option>Botas</option>
            <option>Bufanda</option>
            <option>Calcetines</option>
            <option>Camisa</option>
            <option>Chamarra</option>
            <option>Falda</option>
            <option>Gafas</option>
            <option>Gorro</option>
            <option>Jeans</option>
            <option>Pantalón</option>
            <option>Pijama</option>
            <option>Playera</option>
            <option>Sudadera</option>
            <option>Sueter</option>
            <option>Sombrero</option>
            <option>Tacones</option>
            <option>Vestido</option>
            <option>Zapatos</option>
            <option>Otra</option>
          </InputSelect>
          <InputSelect
            label="Color:"
            name="color"
            onChange={handleChange}
          >
            <option select="true" defaultValue={color}>{color}</option>
            <option>Amarillo</option>
            <option>Azul</option>
            <option>Blanco</option>
            <option>Gris</option>
            <option>Marrón</option>
            <option>Naranja</option>
            <option>Negro</option>
            <option>Rojo</option>
            <option>Rosa</option>
            <option>Verde</option>
            <option>Violeta</option>
            <option>Variado</option>
          </InputSelect>
          <InputSelect
            label="Talla:"
            name="size"
            onChange={handleChange}
          >
            <option select="true" defaultValue={size}>{size}</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </InputSelect>
          <InputSelect
            label="Genero:"
            name="gener"
            onChange={handleChange}
          >
            <option select="true" defaultValue={gender}>{gender}</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Unisex</option>
            <option>Otro</option>
          </InputSelect>
          <InputSelect
            label="Estado:"
            name="state"
            onChange={handleChange}
          >
            <option select="true" defaultValue={state}>{state}</option>
            <option>Bueno</option>
            <option>Regular</option>
            <option>Nuevo</option>
          </InputSelect>
          <Button
            type="normal"
            name="Editar"
          />
          <Button
            type="danger"
            name="Borrar prenda"
            onClick={async () => {
              await turnModalState('EditClotheModal', false);
              await deleteClothe(id, token);
              await getUserClothes(token);
            }}
          />
        </div>
      </form>
    </Modal>
  );
};

const mapStateToProps = ({ modalReducers, userReducer }) => ({
  modalReducers,
  userReducer,
});

const mapDipatchToProps = {
  ...userActions,
  ...modalActions,
};

export default connect(mapStateToProps, mapDipatchToProps)(EditClotheModal);
