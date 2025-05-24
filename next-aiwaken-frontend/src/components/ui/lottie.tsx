/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

interface ILottieProps {
  height?: string | number;
  width?: string | number;
  animationData: any;
}
export const LottieAnimation = ({
  height,
  width,
  animationData,
}: ILottieProps) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={height}
      width={width}
    />
  );
};
