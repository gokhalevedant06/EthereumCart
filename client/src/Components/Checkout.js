import React, { useState, useContext,useEffect } from "react";
import { ethers } from "ethers";
import { TotalContext } from "./TotalContext";


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
    window.alert(err.message)
  }
};

function Checkout() {
  // eslint-disable-next-line
  const { finalAmount, setFinalAmount } = useContext(TotalContext);
  // eslint-disable-next-line
  const [error, setError] = useState();
  // eslint-disable-next-line
  const [txs, setTxs] = useState([]);
  const [myAddress, setMyAddress] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr"),
    });
  };

  // eslint-disable-next-line 
  useEffect(async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress()
    setMyAddress(address)
  }, [])


  return (
    <>
    <p className="payment_note">
      Note : You are sending <b>{finalAmount * 0.00025} ETH</b> from account: <b>{myAddress}</b> to account : <b>0xE2E777d2e49F07B3109ebc6003236a0943dBa80A </b> 
    </p>
      <div className="payment_container">
        <div className="payment_details">
          <h1>
            Amount in $ : {finalAmount}$
            <br />
            Amount in ETH: {finalAmount * 0.00025}
          </h1>
          <form className="m-4" onSubmit={handleSubmit}>
            <div>
                <div className="">
                  <div className="">
                    <input
                    className="payment_input"
                      type="text"
                      name="addr"
                      value={"0xE2E777d2e49F07B3109ebc6003236a0943dBa80A"}
                      placeholder="0xE2E777d2e49F07B3109ebc6003236a0943dBa80A"
                    />
                  </div>
                  <div className="my-3">
                    <input
                    className="payment_input"
                      name="ether"
                      type="text"
                      value={finalAmount * 0.00025}
                      placeholder={`${finalAmount * 0.00025}`}
                      
                    />
                  </div>
                </div>
              <button className="payment_button" type="submit">Pay now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
