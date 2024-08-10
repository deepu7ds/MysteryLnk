"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/image/hero.png";
import hero2Image from "../../../public/image/hero2.png";
import hero3Image from "../../../public/image/hero3.png";
import hero4Image from "../../../public/image/hero4.png";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Github } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="rgb(191, 219, 254)"
                />
                <section className="grid lg:grid-cols-12 lg:gap-8 items-center w-[80%] h-[70vh] lg:h-[50vh] justify-center">
                    <div className="col-span-6 text-center">
                        <p className="text-5xl font-extrabold text-center">
                            Send Anonymous Message to{" "}
                            <span className="text-blue-400">Anyone.</span>
                        </p>
                        <Link href={"/sign-in"}>
                            <Button
                                variant="outline"
                                className="text-lg px-10 py-5 mt-8 "
                            >
                                Create Your Own Link
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="col-span-6 border-2 border-gray-200 w-fit rounded-2xl relative shadow-lg">
                        <Image
                            src={heroImage}
                            width={500}
                            height={300}
                            alt="Description of the image"
                            className="rounded-xl"
                        />
                    </div>
                </section>
                <section className="grid lg:grid-cols-12 lg:gap-8 items-center w-[80%] h-[50vh] lg:h-[40vh] justify-center">
                    <div className="col-span-6 border-2 border-gray-200 w-fit rounded-2xl  shadow-lg">
                        <Image
                            src={hero2Image}
                            width={500}
                            height={300}
                            alt="Description of the image"
                            className="rounded-xl"
                        />
                    </div>
                    <p className="text-5xl font-extrabold col-span-6">
                        Manage Your{" "}
                        <span className="text-blue-400">Messages </span> here.
                    </p>
                </section>
                <section className="flex flex-col lg:flex-row my-10 lg:md-0 justify-around gap-10 container h-[40vh]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <Image
                            src={hero3Image}
                            width={300}
                            height={100}
                            alt="Description of the image"
                            className="rounded-xl shadow-lg"
                        />
                        <p className="font-bold text-xl text-center">
                            Share{" "}
                            <span className="font-extrabold text-blue-400">
                                Link
                            </span>{" "}
                            with just a click.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <Image
                            src={hero4Image}
                            width={200}
                            height={100}
                            alt="Description of the image"
                            className="rounded-xl shadow-lg"
                        />
                        <p className="font-bold text-xl text-center">
                            <span className="font-extrabold text-blue-400">
                                Opt out
                            </span>{" "}
                            when you don&apos;t want to receive messages.
                        </p>
                    </div>
                </section>
                <footer className="grid lg:grid-cols-12 gap-6 justify-center w-full px-6 lg:px-[2.5rem] py-4">
                    <div className="col-span-6 lg:px-6 space-y-2">
                        <h1 className="text-2xl font-extrabold text-center">
                            Anonymous Message
                        </h1>
                        <p>
                            Create an account to receive anonymous messages
                            through a unique link. Share your link, and manage
                            all received messages in your user dashboard.
                        </p>
                    </div>
                    <div className="col-span-6 flex flex-col w-full lg:items-center space-y-2">
                        <h2 className="text-2xl font-bold">Contact Me</h2>
                        <ul className="flex flex-col lg:flex-row gap-1 lg:gap-4">
                            <li className="flex">
                                <a
                                    href="https://www.instagram.com/deep4nshu_?igsh=MXc5YzV5bXB1eWZveg=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <Instagram className="p-1 text-pink-400" />
                                    Instagram
                                </a>
                            </li>
                            <li className="flex">
                                <a
                                    href="https://github.com/deepu7ds"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <Github className="mr-1 p-1 bg-gray-400 rounded-3xl" />
                                    Github
                                </a>
                            </li>
                            <li className="flex">
                                <a
                                    href="https://www.linkedin.com/in/deepanshu-saini-61825824a/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <Linkedin className="p-1 text-blue-400" />
                                    Linkedin
                                </a>
                            </li>
                        </ul>
                    </div>
                </footer>
                <p className="pb-2 w-full text-center">
                    &copy; All Rights Reserved
                </p>
            </div>
        </>
    );
}
