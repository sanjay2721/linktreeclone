'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [text, setText] = useState("")
  const router = useRouter();
  const createTree = () => { 
    
    router.push(`/generate?handle=${text}`)
  }
  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex flex-col justify-center ml-[10vw] gap-4">
          <p className="text-[#d2e823] font-bold text-7xl ">Everything you</p>
          <p className="text-[#d2e823] font-bold text-7xl ">are. In one,</p> 
          <p className="text-[#d2e823] font-bold text-7xl ">simple link in bio.</p>
          <p className="text-white text-xl my-4">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-5">
            <input value={text} onChange={(e)=> setText(e.target.value)} className='bg-white rounded-lg p-6 focus:outline-green-800' type="text" placeholder="Enter your Handle" />
            <button onClick={()=>createTree()} className="font-semibold bg-[#e9c0e9] p-6 rounded-full ">Claim your Linktree</button>
          </div>
        </div>
        <div className="flex flex-col justify-center mr-[10vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>
    </main>
  );
}
