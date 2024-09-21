import Link from "next/link"

export default async function Footer() {

  return (
    <div>
       <div className="mt-8 text-our-gray flex justify-between">
        <Link
        href="mailto:support@startblock.me"
        >
          Contact
        </Link>
        <Link
        target="_blank"
        href="https://oustro.notion.site/b80bda668a6d44ec8a541871d792492a?pvs=4"
        >
          Terms of Service
        </Link>
        <Link
        target="_blank"
        href="https://oustro.notion.site/StartBlock-Privacy-Policy-affe2ae8673e4585b453ea57c47a20f5?pvs=4"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="mt-8 text-our-gray flex justify-between">
        <p>&copy; 2024 Oustro, LLC</p>
        <p>Made in TX</p>
      </div>
    </div>
  )
}