'use client';
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CourseRegistration } from '../components/CourseRegistration'
import Web3 from "web3";
import Link from "next/link";
import { contractABI } from "@/utils/abi";
import { Payment, usePayments } from "@/context/paymetsContext";


declare global {
  interface Window {
    ethereum?: any;
  }
}
export default function Home() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const { payments, setPayments } = usePayments();
  const [courseContract, setCourseContract] = useState<any | null>(null); // You can replace 'any' with the actual contract type if available
  const [courseFee, setCourseFee] = useState<string>('');
  const contractAddress = '0x82C0F3e1B0B98f34f188845b88C0e3854E2E7906';

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const courseInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setCourseContract(courseInstance);

          courseInstance.methods.courseFee().call()
            .then((fee: any) => {
              setCourseFee(web3Instance.utils.fromWei(fee, 'ether'));
            });
        })
        .catch((err: any) => {
          console.error(err);
        });
    } else {
      alert('Please install an another Ethereum wallet.');
    }
  }, []);


  const init = () => {
    if (!web3 || !courseContract) return;
    console.log(courseContract.methods.payments);

    courseContract.methods.getAllPayments().call()
      .then((values: any) => {
        const formattedPayments = values.map((payment: any) => ({
          user: payment[0],
          email: payment[1],
          amount: payment[2]
        }));
        setPayments(formattedPayments);
      });
  }

  useEffect(() => {
    if (web3 && courseContract) {
      init();
    }
  }, [web3, courseContract]);




  return (
    <AuroraBackground>
      <div className="w-full  bg-grid-black/[0.1] relative  px-10 py-24 flex items-center flex-wrap gap-10 justify-around">
        <div
          className="z-50 flex flex-col justify-center items-center "
        >
          <motion.p className="font-bold text-xl hidden md:block md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-900 py-4">
            This Course On Chain! <br />
            Buy It<br />
            with testEth <br />
            Make Your Presence
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-black mx-auto text-center rounded-full relative mt-4">
            <span>See Payments Live </span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </div>
        <CourseRegistration web3={web3} courseContract={courseContract} courseFee={courseFee} />
        <Table>
          <TableCaption>Live Transactions On Chain.</TableCaption>
          <TableHeader>``
            <TableRow>
              <TableHead className="w-[100px]">EMAIL</TableHead>
              <TableHead>USER</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => {
              return <>
                <TableRow key={payment.user}>
                  <TableCell className="font-medium">{payment.email}</TableCell>
                  <TableCell>{payment.user}</TableCell>
                  <TableCell className="text-right">0.011 ETH</TableCell>
                </TableRow>
              </>
            })}
          </TableBody>
        </Table>
      </div>
    </AuroraBackground >
  );
}
