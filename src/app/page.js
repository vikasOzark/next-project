"use client"

import { Card } from '@/components/Card'
import { VscArrowRight, VscBook, VscOrganization } from "react-icons/vsc"
import { TutorCard } from '@/components/TutorCard'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import TestimonialSection from '@/components/Testimonial'


export default function Home() {
    const { push } = useRouter()
    const redirectFunction = () => {
        push("/courses/test-hh")
        
    }
    
  return (
    <>
        <section>
            <HeroSection />
        </section>
      <section className='container mx-auto'>
        <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-12 lg:grid-cols-12">
            <div className="p-2 md:col-span-8 lg:col-span-8">
                <div className="flex items-center justify-between">
                    <h2 className='text-2xl flex items-center gap-2 font-bold text-gray-200'>
                        <VscBook className='mt-1' />
                        Populer classes</h2>
                    <div className="">
                        <button className='flex items-center transition-all gap-1 font-bold text-gray-200 hover:text-gray-800 hover:gap-2'>
                            Explore all 
                            <VscArrowRight />
                        </button>
                    </div>
                </div>
                <div className="grid my-3 grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
                        <Card clickFunction={() => push("/courses/test-hh")} cssClass={"cursor-pointer hover:shadow-xl"} />
                        <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                        <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                        <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                        <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                    
                </div>
            </div>
            <div className="p-2 md:col-span-4 lg:col-span-4" >
                <div className="flex items-center justify-between">
                    <h2 className='text-2xl flex items-center gap-2 font-bold text-gray-200'>
                        <VscOrganization className='mt-1' />
                        Your Best Tutors</h2>
                </div>
                <div className="grid my-3 gap-2 grid-cols-1">
                    <TutorCard />
                    <TutorCard />

                </div>
            </div>
        </div> 
      </section>
      <section>
        <TestimonialSection />
      </section>
    </>
  )
}
