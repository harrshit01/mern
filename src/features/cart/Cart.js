import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteCartItemAsync, selectCartLoaded, selectItems, updateCartAsync } from './cartSlice';
import { discountedPrice } from '../../app/constants';
import Modal from "../common/Modal"




export default function Example() {
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const dispatch = useDispatch();
  const totalamount = items.reduce((amount, item) => amount += discountedPrice(item.product) * item.quantity, 0);
  const totalitems = items.reduce((count, item) => count += item.quantity, 0);

  const [open, setOpen] = useState(true)
  const [openModal, setOpenModal] = useState(null);
  const handleQuantity = (e, item) => {
    e.preventDefault();
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
  }
  const handleRemove = (e, item) => {
    dispatch(deleteCartItemAsync(item));
  }

  return (
    <>
      {/* {!items.length && cartLoaded && <Navigate to='/' replace={true}></Navigate>} */}
      {
        items.length ?
          cartLoaded &&

          <div className="mx-6 bg-white my-6 max-w-7xl px-4 lg:px-8  ">

            <div className="lg:px-4 py-6 sm:px-0">
              <h1 className="text-4xl mb-6 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">${discountedPrice(item.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            <label htmlFor="quantity" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                              Qty
                            </label>
                            <select className="py-1" onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                              <option value={"1"}> 1 </option>
                              <option value={"2"}> 2 </option>
                              <option value={"3"}> 3 </option>
                              <option value={"4"}> 4 </option>
                              <option value={"5"}> 5 </option>

                            </select>
                          </p>

                          <div className="flex">

                            <Modal
                              title={`Delete ${item.product.title}`}
                              message="Are you sure you want to delete this Cart item ?"
                              dangerOption="Delete"
                              cancelOption="Cancel"
                              dangerAction={(e) => handleRemove(e, item.id)}
                              cancelAction={() => setOpenModal(null)}
                              showModal={openModal === item.id}
                            ></Modal>
                            <button
                              // onClick={(e) => handleRemove(e, item.id)}

                              onClick={(e) => { setOpenModal(item.id) }}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-1 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalamount}</p>
              </div>
              <div className="flex justify-between mb-1 text-base font-medium text-gray-900">
                <p>Items in Cart</p>
                <p>{totalitems}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or {" "}
                  <Link to="/">

                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>

                </p>
              </div>
            </div>
          </div> :
          <div className="mx-6 bg-white my-6 max-w-7xl px-4 lg:px-8  ">

            <div className="lg:px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-semibold">Your cart is empty</h1>
            <div className="mt-6">
                <Link
                  to="/"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Add Items
                </Link>
              </div>
            </div >
            </div >
}
          </>

  )
}