'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
const Generate = () => {

    const searchParams = useSearchParams();
    // const [link, setlink] = useState("")
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get("handle") || "")
    const [desc, setdesc] = useState("")
    const [pic, setpic] = useState("")


    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }

    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const res = await r.json();
        if (res.success) {
            toast.success(res.message)
            setLinks([{ link: "", linktext: "" }])
            setpic("")
            sethandle("")
            setdesc("")
        }
        else {
            toast.error(res.message)
        }

    }
    return (
        <div className='bg-[#E9C0E9] min-h-screen grid grid-cols-1 md:grid-cols-2 pt-32 px-4 md:px-10'>
            <div className="col1 flex justify-center items-center flex-col">
                <h1 className='font-bold text-4xl'>Create your Bittree</h1>
                <div className='flex flex-col gap-5 my-8'>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 1:Claim your Handle</h2>
                        <div className="mx-4">
                            <input value={handle || ""} onChange={(e) => sethandle(e.target.value)} className='w-full md:w-[300px] bg-white px-4 py-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Choose a Handle' />
                        </div>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 2:Add Links</h2>
                        {links && links.map((item, index) => {
                            return <div key={index} className='mx-4'>
                                <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='w-full md:w-[300px] bg-white px-4 py-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link text' />
                                <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='w-full md:w-[300px] bg-white px-4 py-2 my-2 focus:outline-pink-500 rounded-full'
                                    type="text" placeholder='Enter link' />
                            </div>
                        })}
                        <button onClick={()=> addLink()} className='p-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full w-full md:w-fit transition duration-300'>
                            + Add Link
                        </button>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 3:Add Picture and Finalize</h2>
                        <div className="mx-4 flex flex-col">
                            <input value={pic || ""} onChange={(e) => setpic(e.target.value)} className='w-full md:w-[300px] bg-white px-4 py-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter your Image URL' />
                            <input value={desc || ""} onChange={e => { setdesc(e.target.value) }} className='w-full md:w-[300px] bg-white px-4 py-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter description' />

                            <button disabled={pic == "" || handle == "" || links[0].linktext == ""} onClick={() => { submitLinks() }} className='disabled:bg-slate-500 p-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full w-full md:w-fit transition duration-300'>Create your BitTree</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col2 w-full h-screen">
                <img className='h-full w-full object-contain' src="/generate.png" alt="generate your links" />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Generate
