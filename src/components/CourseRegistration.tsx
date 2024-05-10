'use client';
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



export const CourseRegistration = ({ web3, courseContract, courseFee }: { web3: any, courseContract: any, courseFee: any }) => {
    const [email, setEmail] = useState('');

    const payForCourse = async () => {
        if (!web3 || !courseContract) return;

        const accounts = await web3.eth.getAccounts();
        courseContract.methods.payForCourse(email).send({ from: accounts[0], value: web3.utils.toWei(courseFee, 'ether') })
            .on('transactionHash', (hash: any) => {
                console.log('Transaction hash:', hash);
            })
            .on('receipt', (receipt: any) => {
                console.log('Transaction successful:', receipt);
            })
            .on('error', (error: any) => {
                console.error('Error:', error);
            });
    };

    return (
        <Dialog >
            <CardContainer className="inter-var cursor-pointer">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl px-3 py-3 border  ">
                    <CardItem
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        0-100 Cohort
                    </CardItem>
                    <CardItem className="w-full">
                        <Image
                            src="https://appx-wsb.classx.co.in/teachcode/admin/COURSE/cover/1699610005757WhatsApp-Image-2023-11-10-at-3.16.18-PM.jpeg"
                            height="500"
                            width="500"
                            className="h-36 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                    <CardItem
                        className="text-neutral-500 text-sm max-w-sm  dark:text-neutral-300"
                    >
                        <ul className="my-1 flex flex-col gap-2">
                            <li className="flex items-center gap-2">
                                <CheckIcon />2 Big-Projects
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon />
                                End-End Full-stack development
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon />
                                Open-Source Oppurtunities
                            </li>
                        </ul>
                    </CardItem>
                    <div className="flex justify-between items-center ">
                        <CardItem
                            as={Link}
                            href="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-4 py-2 rounded-xl text-xl font-normal dark:text-white"
                        >
                            {courseFee} ETH
                        </CardItem>
                        <DialogTrigger asChild>
                            <CardItem
                                as="button"

                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                Buy Now
                            </CardItem>
                        </DialogTrigger>
                    </div>
                </CardBody>
            </CardContainer>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter email</DialogTitle>
                    <DialogDescription>
                        Make sure email should be right (wrong email will create problem).
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input
                            placeholder="enter email"
                            id="link"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={payForCourse} type="submit">Pay for Course</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 