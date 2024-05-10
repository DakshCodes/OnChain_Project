import Image from "next/image";
import Link from "next/link";
import React from "react";


export const Navbar = () => {
    return (
        <div className="z-[999] h-[40px] fixed w-full top-0 overflow-hidden rounded-full p-10 flex justify-between items-center">
            <aside className="flex items-center gap-[10px] ">
                <Link href={'/admin'}>
                <p className=" text-xl font-bold">CourseOnChain</p>
                </Link>
                <Image
                    src="https://i.pinimg.com/564x/96/51/60/9651605860388437ea779e0a51ab5649.jpg"
                    width={30}
                    height={30}
                    alt="fuzzie logo"
                    className="shadow-sm rounded-full"
                />
            </aside>
            <ul className="flex items-center gap-8 list-none">
                <li className=" text-[1rem] font-bold">
                    <Link href="/admin">Transacts</Link>
                </li>
                <li className=" text-[1rem] font-bold">
                    <Link href="/admin">Clients</Link>
                </li>
            </ul>
        </div>
    )
}