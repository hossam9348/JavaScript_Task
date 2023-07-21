import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



export default function Rank() {
  const [rank, setRank] = useState(0)
  const { state } = useLocation();        //recieve score from practice component
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/rank`, { "score": state.score }).then((res) => {
      setRank(res.data.rank)
    }).catch((err) => {
      console.log(err)
    })
  }, [state.score])

  return (
    <div className='text-center p-5 bg-light row align-items-center justify-content-center' style={{ minHeight: "48rem" }}>
      <div className='col-6 row align-items-center justify-content-center' style={{ backgroundColor: "#eeeeee", height:"20rem" }}>
        <h2 className='fs-1 mt-3'>Your Rank is: {rank} %</h2>
        <div className='row justify-content-center mb-3'>
          <Button className='bg-dark col-3 fs-4' style={{ height: "3rem" }} onClick={() => { navigate("/", { replace: true }) }}>Try Again</Button>
        </div>
      </div>
    </div>
  )
}


