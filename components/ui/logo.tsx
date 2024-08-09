import Image from "next/image"
import Link from "next/link"

export default function Logo({ className, link } : { className?: string, link?: string }) {
  return (
    <Link href={link ? link : "/"}>
      <Image
      src="/startblock-logo.svg"
      alt="logo"
      width={45}
      height={45}
      priority
      className={className}
      />
    </Link>
  )
}