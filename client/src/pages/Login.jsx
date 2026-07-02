import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { TbCode } from "react-icons/tb";
import { Link } from "react-router-dom";
import Background from '../assets/Background.png'
import { API_URL } from '../utils/api'

const Login = ({setToken}) => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();
    
    async function loginBtn(e){
        e.preventDefault();
        console.log("login clicked")
        try{
            const result = await fetch(`${API_URL}/auth/login`,
                {
                    method:'post',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({email, password : pass})
                }
            )
            const data = await result.json();
            if (!result.ok) {
                setError("Login failed. Check your credentials.");
                return;
            }
            localStorage.setItem('token', data.token)
            setToken(data.token)
            navigate('/')
        }catch(err){
            setError("Login failed. Check your credentials.")
        }
        
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-screen bg-[#F7F8FA]' style={{backgroundImage: `url(${Background})`}}>
        <div className='absolute inset-0 bg-[#0B2E26]/55'></div>
        <form className="relative z-10 w-full max-w-lg bg-white border border-[#d1d0cd] rounded-2xl shadow-xl p-12">
            <div className='flex flex-col justify-center items-center'>
                <h1 className="flex items-center text-center gap-1 text-4xl font-bold">
                    <TbCode className="text-[#0d4f3e]"/>Code<span className='text-[#0d4f3e]'>Quest</span>
                </h1>
                <h3 className='font-bold text-3xl text-[#1b463b] mt-3'>Welcome Back!</h3>
                <p className='text-gray-500 m-2 text-sm'>Continue your DSA journey.</p>
            </div>
            <div className='flex flex-col'>
                <label className='font-medium text-gray-700 mb-2 text-base'>Email</label>
                <input type="text"
                value={email}
                className='border border-gray-300 rounded-lg py-3 px-4 mb-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20'
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                placeholder='you@example.com'/>
                <label className='font-medium text-gray-700 mb-2 text-base'>Password</label>
                <input type="password"
                value={pass}
                className='border border-gray-300 rounded-lg py-3 px-4 mb-5 focus:outline-none focus:border-[#1D9E75]'
                onChange={(e)=>{
                    setPass(e.target.value)
                }}
                placeholder='••••••••' />
            
                {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
                <button type='button' onClick={loginBtn}
                className='cursor-pointer bg-[#0d4f3e] hover:shadow-md py-3 mt-2 text-lg font-semibold transition-all duration-200 rounded-lg hover:bg-[#08765b] hover:translate-y-0.5'>Login</button>
                <div className='flex justify-center items-center'>
                    <p className='m-2 text-gray-500'>Don't have an account?</p>
                    <Link to="/register" className='text-[#1D9E75] hover:underline font-semibold transition-colors'>Sign Up</Link>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login