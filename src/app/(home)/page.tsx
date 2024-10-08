"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "./image/hero.png";
import hero2Image from "./image/hero2.png";
import hero3Image from "./image/hero3.png";
import hero4Image from "./image/hero4.png";
import herodark from "./image/herodark.png";
import hero2dark from "./image/hero2dark.png";
import hero3dark from "./image/hero3dark.png";
import hero4dark from "./image/hero4dark.png";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Github } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { InView } from "@/components/ui/in-view";

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center ">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20 overflow-x-hidden"
                    fill="rgb(191, 219, 254)"
                />
                <InView
                    variants={{
                        hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    viewOptions={{ margin: "0px 0px -200px 0px" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="grid lg:grid-cols-12 lg:gap-8 items-center w-[80%] h-[80vh] lg:h-[70vh] justify-center"
                >
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
                            className="rounded-xl hidden dark:block"
                        />
                        <Image
                            src={herodark}
                            width={500}
                            height={300}
                            alt="Description of the image"
                            className="rounded-xl block dark:hidden"
                        />
                    </div>
                </InView>
                <InView
                    variants={{
                        hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    viewOptions={{ margin: "0px 0px -200px 0px" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="grid lg:grid-cols-12 lg:gap-8 items-center w-[80%] h-[50vh] lg:h-[60vh] justify-center"
                >
                    <div className="col-span-6 border-2 border-gray-200 w-fit rounded-2xl  shadow-lg">
                        <Image
                            src={hero2Image}
                            width={500}
                            height={300}
                            alt="Description of the image"
                            className="rounded-xl hidden dark:block"
                        />
                        <Image
                            src={hero2dark}
                            width={500}
                            height={300}
                            alt="Description of the image"
                            className="rounded-xl block dark:hidden"
                        />
                    </div>
                    <p className="text-5xl font-extrabold col-span-6">
                        Manage Your{" "}
                        <span className="text-blue-400">Messages </span> here.
                    </p>
                </InView>
                <InView
                    variants={{
                        hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    viewOptions={{ margin: "0px 0px -200px 0px" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col lg:flex-row my-10 lg:md-0 justify-around gap-10 container h-[40vh]"
                >
                    <div className="flex flex-col justify-center items-center gap-4">
                        <Image
                            src={hero3Image}
                            width={300}
                            height={100}
                            alt="Description of the image"
                            className="rounded-xl shadow-lg hidden dark:block"
                        />
                        <Image
                            src={hero3dark}
                            width={300}
                            height={100}
                            alt="Description of the image"
                            className="rounded-xl shadow-lg block dark:hidden"
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
                            className="rounded-xl shadow-lg hidden dark:block"
                        />
                        <Image
                            src={hero4dark}
                            width={200}
                            height={100}
                            alt="Description of the image"
                            className="rounded-xl shadow-lg block dark:hidden"
                        />
                        <p className="font-bold text-xl text-center">
                            <span className="font-extrabold text-blue-400">
                                Opt out
                            </span>{" "}
                            when you don&apos;t want to receive messages.
                        </p>
                    </div>
                </InView>
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
