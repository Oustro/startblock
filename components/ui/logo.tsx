import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/">
      <Image
      src="/startblock-logo.svg"
      alt="logo"
      width={45}
      height={45}
      priority
      />
    </Link>
  )
}