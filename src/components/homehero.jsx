import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'



export default function Example() {

    return (
        <div className="bg-white">
            <div className="relative">
                <div className="mx-auto max-w-7xl">
                    <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                        <svg
                            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="0,0 90,0 50,100 0,100" />
                        </svg>

                        <div className="relative px-6 py-15 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                                <div className="hidden sm:mb- sm:flex">
                                    <div className="relative rounded-full mb-7 px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-pink-900">
                                    "How I struggled and battled with depression, survived mental illness, and crossed to the other side"{' '}
                                        <a href="#" className="whitespace-nowrap font-semibold text-pink-600">
                                            <span className="absolute inset-0 hover:to-black" aria-hidden="true" />
                                            Read more <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Curbing Mental-illness, and reducing stigmatisation, a story at a time...
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    At Haven, we believe that anonymity is a fundamental right for everyone. Our mission is to provide a platform that abstracts your identity to freely chat with anyone while sharing your stories to your peers and connecting with their community with our post and groups feature.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <a
                                        href="#"
                                        className="rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                       Share your story
                                    </a>
                                    <a href="https://drive.google.com/file/d/1OfcFrJyzmFeKLCZSfwupOrH0rNGhMKeB/view?usp=sharing" className="text-sm font-semibold leading-6 text-gray-900">
                                        Learn more about Haven <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="aspect-[3/2] z-10 top-0 object-cover lg:aspect-auto lg:h-full lg:w-full"
                        src="https://images.unsplash.com/photo-1620147461831-a97b99ade1d3?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="safety begins with you"
                    />
                </div>
            </div>
        </div>
    )
}
