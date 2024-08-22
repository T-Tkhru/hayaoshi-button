import { Reggae_One, Stick } from "next/font/google";
//font導入には上のimport、下のexportを追加するほかに、tailwind.config.tsにもfontFamilyを追加して、layout.tsxのhtmlタグにもfontを追加する必要がある。全体のフォント指定はglobal.cssにfont-family=var(--font-xxxx)を追加することで可能になる。

export const reggaeOne = Reggae_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-reggaeOne",
  display: "swap",
});

export const stick = Stick({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-stick",
  display: "swap",
});
