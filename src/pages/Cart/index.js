import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import swal from "sweetalert";
import { FaBox, FaCar, FaCarSide, FaCheck, FaSave, FaTruck, FaTruckMoving, IconName } from "react-icons/fa";

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from "react-icons/md";

import api from '../../services/api'

import * as CartActions from "../../store/modules/cart/actions";

import { formatPrice } from "../../util/format";

import { Container, TableProducts, Total } from "./styles";

import LuizaCoders from '../../assets/images/luiza-labs.png'

function Cart({ products, total, removeFromCart, updateAmountRequest }) {
  const [ stores, setStores ] = useState([])

  useEffect(() => {
    api.get('/store').then(
      response => setStores(response.data)
    )
  }, [])

  const handleRemoveProduct = async product => {
    const choice = await swal({
      title: "Deseja realmente remover o produto?",
      text:
        "Essa ação não poderá ser desfeita e você terá que adicioná-lo novamente.",
      buttons: ["Não", "Sim, remova"],
      icon: "error",
    });

    if (choice) {
      removeFromCart(product.productId);
    }
  };

  const incrementProduct = async  product => 
    updateAmountRequest(product.productId, product.amount + 1);

  const decrementProduct = async  product =>
    updateAmountRequest(product.productId, product.amount - 1);
  return (
    <Container>
      <TableProducts>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
            <tr key={product.productId}>
              <td>
                <div className='image'>
                  <img src={product.imageUrl} alt={product.productName} />
                </div>
              </td>
              <td>
                <strong>{product.productName}</strong>
                <strong>{product.formattedPrice}</strong>
              </td>
              <td>
                <div>
                  <button type='button' onClick={() => decrementProduct(product)}>
                    <MdRemoveCircleOutline size={20} color='#5960c1' />
                  </button>
                  <input type='number' readOnly value={product.amount} />
                  <button
                    type='button' onClick={() => incrementProduct(product)}
                  >
                    <MdAddCircleOutline size={20} color='#5960c1' />
                  </button>
                </div>
              </td>
              <td>
                <span>{product.subTotal}</span>
              </td>
              <td>
                <button
                  type='button'
                  onClick={() => handleRemoveProduct(product)}
                >
                  <MdDelete size={20} color='#5960c1' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableProducts>
      <div className="shipping">
        <div>
          <h5>Selecione a entrega:</h5>
          <p>Confira as lojas disponíveis para retirada:</p>
        </div>
        <select name="select">
          { stores.map( item => (
            <option key={item.ID} value={item.storeName}>{item.storeName}</option>
          )) }
        </select>
        <div>
          <h5>Vendido e entregue por:</h5>
          <img src={LuizaCoders} alt="nome do grupo"/>
        </div>
      </div>

      <div>
        <div className="op">
          <table>
            <tr>
              <td><FaBox size={38}/></td>
              <td><h5>Opções para antecipar sua entrega:</h5></td>
            </tr>

          </table>
        
        </div>
        <table>

          <tr>
            <td>
            <FaCarSide size={40} color='#5960c1' />
            </td>
            <td></td>           
            <td width="80%">Encomenda de até 10Kg</td>
            <td><h5>R$200,00</h5></td>
            <td><input type="checkbox"></input></td>

          </tr>

          <tr>
            <td>
            <FaTruck size={40} color='#5960c1' />
            </td>

            <td></td>           
            <td>Encomenda de 10kg até 100Kg</td>
            <td><h5>R$300,00</h5></td>
            <td><input type="checkbox"></input></td>

          </tr>

          <tr>
            <td>
            <FaTruckMoving size={40} color='#5960c1' />
            </td>

            <td></td>           
            <td>Encomendas acima de 100Kg</td>
            <td><h5>R$400,00</h5></td>
            <td><input type="checkbox"></input></td>

          </tr>
        </table>
      </div>

      <div className="checkout">
        <button type='button'>Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount),
  })),

  total: formatPrice(
    state.cart.reduce((result, product) => {
      return result + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
